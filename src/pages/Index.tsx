import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-secondary to-black">
      <Navbar />

      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent">
            Генератор случайных слов
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Создавайте случайные русские слова для игр, творчества и развлечений. 
            Быстро, удобно, бесплатно.
          </p>

          <Link to="/generator">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-primary/50 transition-all hover:scale-105"
            >
              Начать генерацию
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-20 max-w-5xl mx-auto">
          <Card className="p-6 bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all animate-scale-in hover:scale-105">
            <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Icon name="Shuffle" size={24} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Быстрая генерация</h3>
            <p className="text-muted-foreground">
              Генерируйте от 1 до 10 случайных слов одновременно одним кликом
            </p>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all animate-scale-in hover:scale-105" style={{animationDelay: '0.1s'}}>
            <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Icon name="History" size={24} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">История генераций</h3>
            <p className="text-muted-foreground">
              Сохраняйте историю всех сгенерированных слов и возвращайтесь к ним
            </p>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all animate-scale-in hover:scale-105" style={{animationDelay: '0.2s'}}>
            <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Icon name="Copy" size={24} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Удобное копирование</h3>
            <p className="text-muted-foreground">
              Копируйте слова одним кликом для использования в ваших проектах
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
