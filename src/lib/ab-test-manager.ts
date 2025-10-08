import { supabase } from '@/integrations/supabase/client';

const TEST_START_DATE = '2025-01-15'; // Set when test starts
const TARGET_VISITS_PER_VARIANT = 300;
const MAX_TEST_DAYS = 7;

export const checkTestStatus = async () => {
  // Check elapsed days
  const startDate = new Date(TEST_START_DATE);
  const now = new Date();
  const elapsedDays = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  if (elapsedDays >= MAX_TEST_DAYS) {
    return { shouldStop: true, reason: 'MAX_DAYS_REACHED', elapsedDays };
  }

  // Check visit counts per variant
  const { data, error } = await supabase
    .from('quote_submissions')
    .select('source_variant')
    .gte('created_at', TEST_START_DATE);

  if (error) {
    console.error('Error checking test status:', error);
    return { shouldStop: false, reason: 'ERROR' };
  }

  const variantCounts = data.reduce((acc, row) => {
    const variant = row.source_variant || 'unknown';
    acc[variant] = (acc[variant] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const allVariantsReachedTarget = ['A', 'B', 'C'].every(
    v => (variantCounts[v] || 0) >= TARGET_VISITS_PER_VARIANT
  );

  if (allVariantsReachedTarget) {
    return { 
      shouldStop: true, 
      reason: 'TARGET_VISITS_REACHED', 
      variantCounts 
    };
  }

  return { 
    shouldStop: false, 
    reason: 'TEST_ONGOING', 
    elapsedDays,
    variantCounts 
  };
};

export const exportTestResults = async () => {
  const { data, error } = await supabase
    .from('quote_submissions')
    .select('*')
    .gte('created_at', TEST_START_DATE)
    .order('created_at', { ascending: true });

  if (error) throw error;

  // Generate CSV
  const headers = ['id', 'name', 'phone', 'email', 'package', 'source_variant', 'created_at'];
  const csvRows = [
    headers.join(','),
    ...data.map(row => 
      headers.map(h => `"${row[h] || ''}"`).join(',')
    )
  ];

  return csvRows.join('\n');
};
