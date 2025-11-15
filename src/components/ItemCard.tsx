import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { SteamItem, getRarityClass, getRarityBadgeColor } from '@/types/steam';

interface ItemCardProps {
  item: SteamItem;
  isInCompare: boolean;
  onToggleCompare: (item: SteamItem) => void;
}

export default function ItemCard({ item, isInCompare, onToggleCompare }: ItemCardProps) {
  return (
    <Card
      className={`hover-scale cursor-pointer overflow-hidden border-2 ${getRarityClass(item.rarity)} ${isInCompare ? 'ring-2 ring-primary' : ''} bg-card/50 backdrop-blur-sm group relative`}
    >
      <CardContent className="p-6">
        <Button
          size="sm"
          variant={isInCompare ? 'default' : 'outline'}
          className="absolute top-2 right-2 z-10"
          onClick={() => onToggleCompare(item)}
        >
          <Icon name={isInCompare ? 'Check' : 'Plus'} size={16} />
        </Button>
        <div className="text-6xl mb-4 text-center group-hover:scale-110 transition-transform">
          {item.image}
        </div>
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-semibold text-lg leading-tight">{item.name}</h4>
            <Badge className={getRarityBadgeColor(item.rarity)}>
              {item.rarity}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">${item.price}</span>
            <Button size="sm" className="gap-1">
              <Icon name="Repeat" size={16} />
              Обменять
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
