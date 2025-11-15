import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Header from '@/components/Header';
import ItemCard from '@/components/ItemCard';
import ComparePanel from '@/components/ComparePanel';
import { SteamItem, mockItems, getRarityClass, getRarityBadgeColor } from '@/types/steam';

export default function Index() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [compareItems, setCompareItems] = useState<SteamItem[]>([]);
  const [showCompare, setShowCompare] = useState(false);

  const toggleCompare = (item: SteamItem) => {
    if (compareItems.find(i => i.id === item.id)) {
      setCompareItems(compareItems.filter(i => i.id !== item.id));
    } else if (compareItems.length < 3) {
      setCompareItems([...compareItems, item]);
    }
  };

  const isInCompare = (itemId: number) => {
    return compareItems.some(i => i.id === itemId);
  };

  const clearCompare = () => {
    setCompareItems([]);
    setShowCompare(false);
  };

  const filteredItems = mockItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <div className="space-y-8 animate-fade-in">
            <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 p-8 md:p-12 border border-primary/30">
              <div className="relative z-10 max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Обменивай предметы Steam
                  <br />
                  <span className="text-primary">быстро и безопасно</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Автоматический обмен через Steam API. Тысячи предметов из CS2, Dota 2, TF2 и других игр.
                </p>
                <div className="flex gap-3">
                  <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
                    <Icon name="Zap" size={20} />
                    Начать обмен
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2">
                    <Icon name="PlayCircle" size={20} />
                    Как это работает
                  </Button>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/30 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/30 rounded-full blur-3xl"></div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Популярные предметы</h3>
                <div className="flex gap-2">
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                    CS2
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                    Dota 2
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                    TF2
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockItems.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    isInCompare={isInCompare(item.id)}
                    onToggleCompare={toggleCompare}
                  />
                ))}
              </div>
            </section>

            <section className="grid md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
                <CardContent className="p-6 text-center">
                  <Icon name="Zap" size={48} className="mx-auto mb-4 text-primary" />
                  <h4 className="text-xl font-bold mb-2">Мгновенный обмен</h4>
                  <p className="text-muted-foreground">Автоматическая обработка через Steam API</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/30">
                <CardContent className="p-6 text-center">
                  <Icon name="Shield" size={48} className="mx-auto mb-4 text-secondary" />
                  <h4 className="text-xl font-bold mb-2">100% безопасно</h4>
                  <p className="text-muted-foreground">Защищенные сделки без риска</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/30">
                <CardContent className="p-6 text-center">
                  <Icon name="TrendingUp" size={48} className="mx-auto mb-4 text-accent" />
                  <h4 className="text-xl font-bold mb-2">Лучшие цены</h4>
                  <p className="text-muted-foreground">Актуальные котировки рынка Steam</p>
                </CardContent>
              </Card>
            </section>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Мой инвентарь</h2>
              <div className="flex gap-3">
                <Input
                  placeholder="Поиск предметов..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64"
                />
                <Button variant="outline" className="gap-2">
                  <Icon name="Filter" size={18} />
                  Фильтры
                </Button>
              </div>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">Все ({filteredItems.length})</TabsTrigger>
                <TabsTrigger value="weapons">Оружие</TabsTrigger>
                <TabsTrigger value="knives">Ножи</TabsTrigger>
                <TabsTrigger value="rare">Редкие</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredItems.map((item) => (
                    <Card
                      key={item.id}
                      className={`hover-scale cursor-pointer border-2 ${getRarityClass(item.rarity)} group`}
                    >
                      <CardContent className="p-4">
                        <div className="text-5xl mb-3 text-center group-hover:scale-110 transition-transform">
                          {item.image}
                        </div>
                        <h4 className="font-semibold text-sm mb-2 truncate">{item.name}</h4>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-primary">${item.price}</span>
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {activeTab === 'trades' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold">Активные обмены</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-primary/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-2xl">
                      ⚡
                    </div>
                    <div>
                      <h4 className="font-bold">Быстрый обмен</h4>
                      <p className="text-sm text-muted-foreground">Обменяй свои предметы на боты</p>
                    </div>
                  </div>
                  <Button className="w-full gap-2">
                    <Icon name="Zap" size={18} />
                    Создать обмен
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-secondary/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-2xl">
                      👥
                    </div>
                    <div>
                      <h4 className="font-bold">P2P обмен</h4>
                      <p className="text-sm text-muted-foreground">Обменивайся с другими игроками</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full gap-2">
                    <Icon name="Users" size={18} />
                    Найти игрока
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-4">История обменов</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">🎯</div>
                        <div>
                          <p className="font-semibold">AWP | Dragon Lore</p>
                          <p className="text-sm text-muted-foreground">5 минут назад</p>
                        </div>
                      </div>
                      <Badge className="bg-green-500">Завершено</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6 animate-fade-in">
            <Card className="border-primary/50">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <Avatar className="w-24 h-24 border-4 border-primary">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-3xl bg-primary/20">🎮</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-3xl font-bold">ProTrader2024</h2>
                      <Badge className="bg-[hsl(var(--legendary))]">Легенда</Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">Steam ID: 76561198000000000</p>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-muted/50 rounded-lg p-4 text-center">
                        <p className="text-3xl font-bold text-primary">248</p>
                        <p className="text-sm text-muted-foreground">Обменов</p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4 text-center">
                        <p className="text-3xl font-bold text-secondary">$12,450</p>
                        <p className="text-sm text-muted-foreground">Оборот</p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4 text-center">
                        <p className="text-3xl font-bold text-accent">98.5%</p>
                        <p className="text-sm text-muted-foreground">Рейтинг</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <Icon name="Trophy" size={24} className="text-accent" />
                    Достижения
                  </h3>
                  <div className="space-y-3">
                    {['Первый обмен', 'Коллекционер', 'Торговец года'].map((achievement, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                        <div className="text-2xl">🏆</div>
                        <span className="font-medium">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <Icon name="Settings" size={24} />
                    Настройки
                  </h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Icon name="Link" size={18} />
                      Ссылка на обмен Steam
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Icon name="Bell" size={18} />
                      Уведомления
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Icon name="Shield" size={18} />
                      Безопасность
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-border mt-16 py-8 bg-card/30">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 SteamTrade. Автоматический обмен предметами Steam</p>
        </div>
      </footer>

      <ComparePanel
        compareItems={compareItems}
        showCompare={showCompare}
        onToggleShow={() => setShowCompare(!showCompare)}
        onClear={clearCompare}
        onRemoveItem={toggleCompare}
      />
    </div>
  );
}