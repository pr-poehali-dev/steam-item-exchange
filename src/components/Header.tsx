import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-4xl">⚡</div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            SteamTrade
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Button
            variant={activeTab === 'home' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('home')}
            className="gap-2"
          >
            <Icon name="Home" size={18} />
            Главная
          </Button>
          <Button
            variant={activeTab === 'inventory' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('inventory')}
            className="gap-2"
          >
            <Icon name="Package" size={18} />
            Инвентарь
          </Button>
          <Button
            variant={activeTab === 'trades' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('trades')}
            className="gap-2"
          >
            <Icon name="Repeat" size={18} />
            Обмены
          </Button>
          <Button
            variant={activeTab === 'profile' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('profile')}
            className="gap-2"
          >
            <Icon name="User" size={18} />
            Профиль
          </Button>
        </nav>

        <Button className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
          <Icon name="LogIn" size={18} />
          Войти через Steam
        </Button>
      </div>
    </header>
  );
}
