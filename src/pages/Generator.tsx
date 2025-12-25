import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

const russianWords = [
  "солнце", "луна", "звезда", "облако", "дождь", "снег", "ветер", "гроза", "радуга", "туман",
  "океан", "река", "озеро", "гора", "долина", "лес", "поле", "цветок", "дерево", "трава",
  "птица", "рыба", "бабочка", "пчела", "медведь", "волк", "лиса", "заяц", "олень", "белка",
  "книга", "музыка", "танец", "песня", "картина", "театр", "кино", "спорт", "игра", "праздник",
  "дом", "город", "деревня", "улица", "мост", "башня", "замок", "парк", "сад", "площадь",
  "счастье", "любовь", "дружба", "мечта", "надежда", "вера", "радость", "покой", "свобода", "мудрость",
  "время", "память", "будущее", "прошлое", "настоящее", "миг", "век", "эпоха", "история", "судьба",
  "огонь", "вода", "земля", "воздух", "свет", "тень", "ночь", "день", "рассвет", "закат",
  "весна", "лето", "осень", "зима", "тепло", "холод", "жара", "мороз", "ветер", "тишина",
  "камень", "песок", "глина", "соль", "золото", "серебро", "медь", "железо", "стекло", "хрусталь"
];

const Generator = () => {
  const [count, setCount] = useState<number>(3);
  const [generatedWords, setGeneratedWords] = useState<string[]>([]);
  const { toast } = useToast();

  const generateWords = () => {
    const shuffled = [...russianWords].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count);
    setGeneratedWords(selected);

    const existingHistory = localStorage.getItem("wordHistory");
    const history = existingHistory ? JSON.parse(existingHistory) : [];
    const newEntry = {
      words: selected,
      count: count,
      timestamp: new Date().toISOString(),
    };
    const updatedHistory = [newEntry, ...history].slice(0, 50);
    localStorage.setItem("wordHistory", JSON.stringify(updatedHistory));
  };

  const copyWord = (word: string) => {
    navigator.clipboard.writeText(word);
    toast({
      title: "Скопировано!",
      description: `Слово "${word}" скопировано в буфер обмена`,
    });
  };

  const copyAll = () => {
    navigator.clipboard.writeText(generatedWords.join(", "));
    toast({
      title: "Скопировано!",
      description: `Все слова скопированы в буфер обмена`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-secondary to-black">
      <Navbar />

      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent animate-fade-in">
            Генератор слов
          </h1>
          <p className="text-muted-foreground text-center mb-12 animate-fade-in">
            Выберите количество слов и нажмите "Генерировать"
          </p>

          <Card className="p-8 bg-card/50 backdrop-blur border-border mb-8 animate-scale-in">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <label className="text-lg font-semibold">Количество слов</label>
                <span className="text-3xl font-bold text-primary">{count}</span>
              </div>
              <Slider
                value={[count]}
                onValueChange={(value) => setCount(value[0])}
                min={1}
                max={10}
                step={1}
                className="mb-2"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>1</span>
                <span>10</span>
              </div>
            </div>

            <Button
              onClick={generateWords}
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold text-lg py-6 rounded-xl transition-all hover:scale-105"
            >
              <Icon name="Sparkles" size={20} className="mr-2" />
              Генерировать
            </Button>
          </Card>

          {generatedWords.length > 0 && (
            <Card className="p-8 bg-card/50 backdrop-blur border-border animate-scale-in">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Сгенерированные слова</h2>
                <Button
                  onClick={copyAll}
                  variant="outline"
                  size="sm"
                  className="border-primary/50 hover:bg-primary/10"
                >
                  <Icon name="Copy" size={16} className="mr-2" />
                  Копировать все
                </Button>
              </div>

              <div className="grid gap-3">
                {generatedWords.map((word, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-all group animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <span className="text-lg font-medium">{word}</span>
                    <Button
                      onClick={() => copyWord(word)}
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Icon name="Copy" size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Generator;
