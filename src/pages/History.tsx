import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

interface HistoryEntry {
  words: string[];
  count: number;
  timestamp: string;
}

const History = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const loadHistory = () => {
      const existingHistory = localStorage.getItem("wordHistory");
      if (existingHistory) {
        setHistory(JSON.parse(existingHistory));
      }
    };
    loadHistory();
  }, []);

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const copyWords = (words: string[]) => {
    navigator.clipboard.writeText(words.join(", "));
    toast({
      title: "Скопировано!",
      description: `Слова скопированы в буфер обмена`,
    });
  };

  const clearHistory = () => {
    localStorage.removeItem("wordHistory");
    setHistory([]);
    toast({
      title: "История очищена",
      description: "Вся история генераций удалена",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-secondary to-black">
      <Navbar />

      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8 animate-fade-in">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent">
                История генераций
              </h1>
              <p className="text-muted-foreground">
                Все ваши сгенерированные слова сохраняются здесь
              </p>
            </div>
            {history.length > 0 && (
              <Button
                onClick={clearHistory}
                variant="outline"
                className="border-destructive/50 text-destructive hover:bg-destructive/10"
              >
                <Icon name="Trash2" size={16} className="mr-2" />
                Очистить
              </Button>
            )}
          </div>

          {history.length === 0 ? (
            <Card className="p-12 bg-card/50 backdrop-blur border-border text-center animate-scale-in">
              <Icon name="History" size={64} className="text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">История пуста</h2>
              <p className="text-muted-foreground mb-6">
                Сгенерируйте слова, и они появятся здесь
              </p>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <a href="/generator">
                  <Icon name="Sparkles" size={16} className="mr-2" />
                  Перейти к генератору
                </a>
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {history.map((entry, index) => (
                <Card
                  key={index}
                  className="p-6 bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Icon name="Clock" size={16} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {formatDate(entry.timestamp)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Hash" size={16} className="text-primary" />
                        <span className="text-sm font-medium">
                          Слов: {entry.count}
                        </span>
                      </div>
                    </div>
                    <Button
                      onClick={() => copyWords(entry.words)}
                      variant="outline"
                      size="sm"
                      className="border-primary/50 hover:bg-primary/10"
                    >
                      <Icon name="Copy" size={16} className="mr-2" />
                      Копировать
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {entry.words.map((word, wordIndex) => (
                      <span
                        key={wordIndex}
                        className="px-3 py-1.5 bg-secondary rounded-lg text-sm font-medium"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
