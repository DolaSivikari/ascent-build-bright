import { useState, useMemo } from 'react';
import { useMaterials } from '@/hooks/useMaterials';
import { UserCriteria, DEFAULT_WEIGHTS, ScoredMaterial } from '@/types/materials';
import { scoreMaterials, filterMaterials } from '@/utils/materialScoring';
import FiltersPanel from './FiltersPanel';
import MaterialCard from './MaterialCard';
import PackageBuilder from './PackageBuilder';
import RecommendationSection from './RecommendationSection';
import { Input } from '@/components/ui/input';
import { Search, Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function MaterialSelector() {
  const { data: materials, isLoading } = useMaterials();
  
  const [criteria, setCriteria] = useState<UserCriteria>({
    projectType: 'residential',
    substrate: [],
    climateTags: [],
    longevity: 10,
    budget: 'standard',
    sustainability: false,
    weights: DEFAULT_WEIGHTS,
  });

  const [shortlist, setShortlist] = useState<ScoredMaterial[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);

  // Apply filtering and scoring
  const processedMaterials = useMemo(() => {
    if (!materials) return [];

    const filtered = filterMaterials(materials, {
      category: categoryFilter,
      search: searchQuery,
    });

    return scoreMaterials(filtered, criteria);
  }, [materials, criteria, searchQuery, categoryFilter]);

  const handleAddToShortlist = (material: ScoredMaterial) => {
    if (shortlist.length >= 3) {
      return; // Max 3 items
    }
    if (!shortlist.find(m => m.id === material.id)) {
      setShortlist([...shortlist, material]);
    }
  };

  const handleRemoveFromShortlist = (materialId: string) => {
    setShortlist(shortlist.filter(m => m.id !== materialId));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-3 text-muted-foreground">Loading materials...</span>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-4">
            <FiltersPanel 
              criteria={criteria} 
              onChange={setCriteria}
              onCategoryFilterChange={setCategoryFilter}
              selectedCategories={categoryFilter}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search and Package Builder */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search materials by name, brand, or features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <PackageBuilder
              shortlist={shortlist}
              onRemove={handleRemoveFromShortlist}
              criteria={criteria}
            />
          </div>

          {/* Top Recommendations */}
          <RecommendationSection materials={processedMaterials} />

          {/* Results Tabs */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">
                All Results ({processedMaterials.length})
              </TabsTrigger>
              <TabsTrigger value="top">
                Top Matches
              </TabsTrigger>
              <TabsTrigger value="shortlist" disabled={shortlist.length === 0}>
                Shortlist ({shortlist.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              {processedMaterials.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No materials match your criteria. Try adjusting your filters.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {processedMaterials.map((material) => (
                    <MaterialCard
                      key={material.id}
                      material={material}
                      onAddToShortlist={handleAddToShortlist}
                      isInShortlist={shortlist.some(m => m.id === material.id)}
                      shortlistFull={shortlist.length >= 3}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="top" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {processedMaterials.slice(0, 6).map((material) => (
                  <MaterialCard
                    key={material.id}
                    material={material}
                    onAddToShortlist={handleAddToShortlist}
                    isInShortlist={shortlist.some(m => m.id === material.id)}
                    shortlistFull={shortlist.length >= 3}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="shortlist" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {shortlist.map((material) => (
                  <MaterialCard
                    key={material.id}
                    material={material}
                    onAddToShortlist={handleAddToShortlist}
                    isInShortlist={true}
                    shortlistFull={false}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
