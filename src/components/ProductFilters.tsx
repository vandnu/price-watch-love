import { categories, type SortOption } from "@/data/priceData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown, Filter } from "lucide-react";

type Props = {
  category: string;
  sort: SortOption;
  onCategoryChange: (c: string) => void;
  onSortChange: (s: SortOption) => void;
  resultCount: number;
};

const sortLabels: Record<SortOption, string> = {
  priceChange: "Størst prisstigning",
  name: "Navn (A–Å)",
  category: "Kategori",
  currentPrice: "Pris (højest først)",
};

const ProductFilters = ({ category, sort, onCategoryChange, onSortChange, resultCount }: Props) => (
  <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-8">
    <div className="flex flex-wrap gap-3">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <Select value={category} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-[180px] bg-card border-border">
            <SelectValue placeholder="Kategori" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
        <Select value={sort} onValueChange={(v) => onSortChange(v as SortOption)}>
          <SelectTrigger className="w-[200px] bg-card border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(sortLabels) as SortOption[]).map((key) => (
              <SelectItem key={key} value={key}>
                {sortLabels[key]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>

    <p className="font-body text-sm text-muted-foreground">
      Viser {resultCount} vare{resultCount !== 1 ? "r" : ""}
    </p>
  </div>
);

export default ProductFilters;
