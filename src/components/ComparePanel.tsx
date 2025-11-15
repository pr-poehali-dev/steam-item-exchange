import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { SteamItem, getRarityClass, getRarityBadgeColor } from '@/types/steam';

interface ComparePanelProps {
  compareItems: SteamItem[];
  showCompare: boolean;
  onToggleShow: () => void;
  onClear: () => void;
  onRemoveItem: (item: SteamItem) => void;
}

export default function ComparePanel({
  compareItems,
  showCompare,
  onToggleShow,
  onClear,
  onRemoveItem
}: ComparePanelProps) {
  if (compareItems.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t-2 border-primary shadow-2xl z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Icon name="Scale" size={20} />
            Сравнение предметов ({compareItems.length}/3)
          </h3>
          <div className="flex gap-2">
            {compareItems.length >= 2 && (
              <Button onClick={onToggleShow} className="gap-2">
                <Icon name="BarChart3" size={18} />
                {showCompare ? 'Скрыть' : 'Показать сравнение'}
              </Button>
            )}
            <Button variant="outline" onClick={onClear} className="gap-2">
              <Icon name="X" size={18} />
              Очистить
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          {compareItems.map((item) => (
            <Card key={item.id} className={`border-2 ${getRarityClass(item.rarity)}`}>
              <CardContent className="p-4">
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-1 right-1"
                  onClick={() => onRemoveItem(item)}
                >
                  <Icon name="X" size={14} />
                </Button>
                <div className="text-4xl text-center mb-2">{item.image}</div>
                <h4 className="font-semibold text-sm mb-2 truncate">{item.name}</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Цена:</span>
                    <span className="font-bold text-primary">${item.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Редкость:</span>
                    <Badge className={`${getRarityBadgeColor(item.rarity)} text-xs`}>
                      {item.rarity}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Категория:</span>
                    <span>{item.category}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {[...Array(3 - compareItems.length)].map((_, i) => (
            <Card key={`empty-${i}`} className="border-2 border-dashed border-muted">
              <CardContent className="p-4 flex items-center justify-center h-full">
                <div className="text-center text-muted-foreground">
                  <Icon name="Plus" size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-xs">Добавить предмет</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {showCompare && compareItems.length >= 2 && (
          <div className="mt-4 p-4 bg-muted/30 rounded-lg">
            <h4 className="font-bold mb-3 flex items-center gap-2">
              <Icon name="TrendingUp" size={18} />
              Анализ сравнения
            </h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Самый дорогой:</p>
                <p className="font-bold text-primary">
                  {compareItems.reduce((max, item) => item.price > max.price ? item : max).name}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Средняя цена:</p>
                <p className="font-bold text-secondary">
                  ${(compareItems.reduce((sum, item) => sum + item.price, 0) / compareItems.length).toFixed(0)}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Разница цен:</p>
                <p className="font-bold text-accent">
                  ${Math.max(...compareItems.map(i => i.price)) - Math.min(...compareItems.map(i => i.price))}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
