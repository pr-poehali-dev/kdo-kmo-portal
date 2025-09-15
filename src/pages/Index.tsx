import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [accessibilityMode, setAccessibilityMode] = useState(false);
  const [fontSize, setFontSize] = useState('normal');
  const [contrast, setContrast] = useState('normal');

  // Применяем стили accessibility к документу
  useEffect(() => {
    const root = document.documentElement;
    
    if (accessibilityMode) {
      root.classList.add('accessibility-mode');
      root.style.setProperty('--font-size-multiplier', fontSize === 'large' ? '1.2' : fontSize === 'xlarge' ? '1.4' : '1');
      root.style.setProperty('--contrast-mode', contrast);
    } else {
      root.classList.remove('accessibility-mode');
      root.style.removeProperty('--font-size-multiplier');
      root.style.removeProperty('--contrast-mode');
    }
  }, [accessibilityMode, fontSize, contrast]);

  const toggleAccessibility = () => {
    setAccessibilityMode(!accessibilityMode);
  };

  const changeFontSize = (size: string) => {
    setFontSize(size);
  };

  const changeContrast = (contrastType: string) => {
    setContrast(contrastType);
  };

  // Озвучивание текста (базовая реализация)
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ru-RU';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className={`min-h-screen ${accessibilityMode ? 'bg-black text-white' : 'bg-gray-50'} transition-all duration-300`}>
      {/* Панель специальных возможностей */}
      <div className={`border-b-2 ${accessibilityMode ? 'bg-yellow-400 text-black border-black' : 'bg-gov-blue text-white border-gov-blue'} p-2`}>
        <div className="container mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Icon name="Eye" size={20} />
            <span className="font-medium">Версия для слабовидящих</span>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <Button 
              size="sm" 
              variant={accessibilityMode ? "secondary" : "outline"}
              onClick={toggleAccessibility}
              className="text-sm"
            >
              {accessibilityMode ? "Обычная версия" : "Включить"}
            </Button>
            
            {accessibilityMode && (
              <>
                <div className="flex gap-1">
                  <Button 
                    size="sm" 
                    variant={fontSize === 'normal' ? "secondary" : "outline"}
                    onClick={() => changeFontSize('normal')}
                    className="text-xs px-2"
                  >
                    А
                  </Button>
                  <Button 
                    size="sm" 
                    variant={fontSize === 'large' ? "secondary" : "outline"}
                    onClick={() => changeFontSize('large')}
                    className="text-sm px-2"
                  >
                    А
                  </Button>
                  <Button 
                    size="sm" 
                    variant={fontSize === 'xlarge' ? "secondary" : "outline"}
                    onClick={() => changeFontSize('xlarge')}
                    className="text-lg px-2"
                  >
                    А
                  </Button>
                </div>
                
                <div className="flex gap-1">
                  <Button 
                    size="sm" 
                    variant={contrast === 'normal' ? "secondary" : "outline"}
                    onClick={() => changeContrast('normal')}
                    className="text-xs px-2"
                  >
                    Ч/Б
                  </Button>
                  <Button 
                    size="sm" 
                    variant={contrast === 'blue' ? "secondary" : "outline"}
                    onClick={() => changeContrast('blue')}
                    className="text-xs px-2 bg-blue-600 text-white"
                  >
                    С/Г
                  </Button>
                  <Button 
                    size="sm" 
                    variant={contrast === 'brown' ? "secondary" : "outline"}
                    onClick={() => changeContrast('brown')}
                    className="text-xs px-2 bg-yellow-800 text-white"
                  >
                    К/Ж
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Основная навигация */}
      <header className={`shadow-md ${accessibilityMode ? 'bg-yellow-400 text-black' : 'bg-white'} transition-all duration-300`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${accessibilityMode ? 'bg-black' : 'bg-gov-blue'} rounded-lg flex items-center justify-center`}>
                <Icon name="Building" size={24} className="text-white" />
              </div>
              <div>
                <h1 className={`text-xl font-bold ${accessibilityMode ? 'text-black' : 'text-gov-blue'} transition-all`}>
                  МУК КДО
                </h1>
                <p className={`text-sm ${accessibilityMode ? 'text-gray-800' : 'text-gray-600'}`}>
                  Котласский МО
                </p>
              </div>
            </div>
            
            <nav className="hidden md:flex gap-6">
              {['Главная', 'Контакты', 'Подразделения', 'Документы'].map((item) => (
                <button
                  key={item}
                  className={`px-4 py-2 rounded-md font-medium transition-all ${
                    accessibilityMode 
                      ? 'text-black hover:bg-black hover:text-yellow-400' 
                      : 'text-gov-blue hover:bg-gov-blue hover:text-white'
                  }`}
                  onClick={() => speakText(item)}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Главная секция */}
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className={`text-center py-16 rounded-xl ${
            accessibilityMode ? 'bg-yellow-900 text-white' : 'bg-gradient-to-r from-gov-blue to-gov-blue/80 text-white'
          } transition-all duration-300`}>
            <Badge 
              className={`mb-4 ${accessibilityMode ? 'bg-black text-yellow-400' : 'bg-gov-gold text-black'}`}
              onClick={() => speakText('Официальный сайт')}
            >
              Официальный сайт
            </Badge>
            <h1 
              className={`text-4xl md:text-5xl font-bold mb-6 ${
                fontSize === 'large' ? 'text-5xl md:text-6xl' : fontSize === 'xlarge' ? 'text-6xl md:text-7xl' : ''
              }`}
              onClick={() => speakText('Муниципальное учреждение культуры Культурно-досуговое объединение Котласского Муниципального Округа')}
            >
              МУК "КДО КМО"
            </h1>
            <p 
              className={`text-lg md:text-xl mb-8 opacity-90 max-w-3xl mx-auto ${
                fontSize === 'large' ? 'text-xl md:text-2xl' : fontSize === 'xlarge' ? 'text-2xl md:text-3xl' : ''
              }`}
              onClick={() => speakText('Муниципальное учреждение культуры Культурно-досуговое объединение Котласского Муниципального Округа')}
            >
              Муниципальное учреждение культуры<br />
              "Культурно-досуговое объединение<br />
              Котласского Муниципального Округа"
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className={`${
                  accessibilityMode ? 'bg-black text-yellow-400 hover:bg-gray-900' : 'bg-gov-gold text-black hover:bg-gov-gold/90'
                } transition-all`}
                onClick={() => speakText('Государственные услуги')}
              >
                <Icon name="ExternalLink" size={20} className="mr-2" />
                Госуслуги
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className={`${
                  accessibilityMode ? 'border-white text-white hover:bg-white hover:text-black' : 'border-white text-white hover:bg-white hover:text-gov-blue'
                } transition-all`}
                onClick={() => speakText('Контактная информация')}
              >
                <Icon name="Phone" size={20} className="mr-2" />
                Контакты
              </Button>
            </div>
          </div>
        </section>

        {/* Информация об объединении */}
        <section className="mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 
                className={`text-3xl font-bold mb-6 ${
                  accessibilityMode ? 'text-white' : 'text-gov-blue'
                } ${fontSize === 'large' ? 'text-4xl' : fontSize === 'xlarge' ? 'text-5xl' : ''}`}
                onClick={() => speakText('О нашем объединении')}
              >
                О нашем объединении
              </h2>
              <div className="space-y-4">
                <p 
                  className={`${
                    fontSize === 'large' ? 'text-lg' : fontSize === 'xlarge' ? 'text-xl' : 'text-base'
                  } ${accessibilityMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}
                  onClick={() => speakText('МУК КДО - Муниципальное учреждение культуры Культурно-досуговое объединение Котласского Муниципального Округа')}
                >
                  <strong>МУК КДО</strong> — Муниципальное учреждение культуры 
                  "Культурно-досуговое объединение Котласского Муниципального Округа".
                </p>
                <p 
                  className={`${
                    fontSize === 'large' ? 'text-lg' : fontSize === 'xlarge' ? 'text-xl' : 'text-base'
                  } ${accessibilityMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}
                  onClick={() => speakText('Объединение было открыто 28 сентября 2023 года. Объединились 13 учреждений культуры Котласского М.О.')}
                >
                  Объединение было открыто <strong>28 сентября 2023 года</strong>. 
                  Объединились 13 учреждений культуры Котласского М.О.
                </p>
              </div>
              
              <div className="flex gap-4 mt-6">
                <Button 
                  className={`${
                    accessibilityMode ? 'bg-yellow-400 text-black hover:bg-yellow-500' : 'bg-gov-blue hover:bg-gov-blue/90'
                  } transition-all`}
                  onClick={() => speakText('Подробнее')}
                >
                  Подробнее
                </Button>
                <Button 
                  variant="outline"
                  className={`${
                    accessibilityMode ? 'border-white text-white hover:bg-white hover:text-black' : ''
                  } transition-all`}
                  onClick={() => speakText('Услуги')}
                >
                  Наши услуги
                </Button>
              </div>
            </div>
            
            <Card className={`${accessibilityMode ? 'bg-gray-900 border-gray-700' : ''} transition-all duration-300`}>
              <CardHeader>
                <CardTitle 
                  className={`flex items-center gap-2 ${accessibilityMode ? 'text-white' : 'text-gov-blue'}`}
                  onClick={() => speakText('Ключевые показатели')}
                >
                  <Icon name="BarChart3" size={24} />
                  Ключевые показатели
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: 'Учреждений в составе', value: '13', icon: 'Building2' },
                  { label: 'Лет работы', value: '1', icon: 'Calendar' },
                  { label: 'Населенных пунктов', value: '40+', icon: 'MapPin' }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800 cursor-pointer"
                    onClick={() => speakText(`${item.label}: ${item.value}`)}
                  >
                    <div className="flex items-center gap-3">
                      <Icon name={item.icon as any} size={20} className={accessibilityMode ? 'text-yellow-400' : 'text-gov-blue'} />
                      <span className={`${accessibilityMode ? 'text-gray-300' : 'text-gray-600'} ${
                        fontSize === 'large' ? 'text-base' : fontSize === 'xlarge' ? 'text-lg' : 'text-sm'
                      }`}>
                        {item.label}
                      </span>
                    </div>
                    <span className={`font-bold ${accessibilityMode ? 'text-white' : 'text-gov-blue'} ${
                      fontSize === 'large' ? 'text-xl' : fontSize === 'xlarge' ? 'text-2xl' : 'text-lg'
                    }`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Подразделения */}
        <section className="mb-12">
          <h2 
            className={`text-3xl font-bold mb-8 text-center ${
              accessibilityMode ? 'text-white' : 'text-gov-blue'
            } ${fontSize === 'large' ? 'text-4xl' : fontSize === 'xlarge' ? 'text-5xl' : ''}`}
            onClick={() => speakText('Наши подразделения')}
          >
            Наши подразделения
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                title: 'Дома культуры', 
                count: '8', 
                icon: 'Home',
                description: 'Центры культурной жизни поселений'
              },
              { 
                title: 'Библиотеки', 
                count: '3', 
                icon: 'BookOpen',
                description: 'Информационные и культурные центры'
              },
              { 
                title: 'Клубы', 
                count: '2', 
                icon: 'Users',
                description: 'Центры досуга и общения'
              }
            ].map((dept, index) => (
              <Card 
                key={index} 
                className={`hover:shadow-lg transition-all duration-300 cursor-pointer ${
                  accessibilityMode ? 'bg-gray-900 border-gray-700 hover:bg-gray-800' : 'hover:shadow-gov-blue/20'
                }`}
                onClick={() => speakText(`${dept.title}: ${dept.count} учреждений. ${dept.description}`)}
              >
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                    accessibilityMode ? 'bg-yellow-400' : 'bg-gov-blue/10'
                  }`}>
                    <Icon 
                      name={dept.icon as any} 
                      size={32} 
                      className={accessibilityMode ? 'text-black' : 'text-gov-blue'} 
                    />
                  </div>
                  <CardTitle className={`${accessibilityMode ? 'text-white' : 'text-gov-blue'} ${
                    fontSize === 'large' ? 'text-xl' : fontSize === 'xlarge' ? 'text-2xl' : ''
                  }`}>
                    {dept.title}
                  </CardTitle>
                  <div className={`text-3xl font-bold ${accessibilityMode ? 'text-yellow-400' : 'text-gov-gold'} ${
                    fontSize === 'large' ? 'text-4xl' : fontSize === 'xlarge' ? 'text-5xl' : ''
                  }`}>
                    {dept.count}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className={`text-center ${accessibilityMode ? 'text-gray-300' : 'text-gray-600'} ${
                    fontSize === 'large' ? 'text-base' : fontSize === 'xlarge' ? 'text-lg' : 'text-sm'
                  }`}>
                    {dept.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Контакты */}
        <section className="mb-12">
          <h2 
            className={`text-3xl font-bold mb-8 text-center ${
              accessibilityMode ? 'text-white' : 'text-gov-blue'
            } ${fontSize === 'large' ? 'text-4xl' : fontSize === 'xlarge' ? 'text-5xl' : ''}`}
            onClick={() => speakText('Контактная информация')}
          >
            Контактная информация
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className={`${accessibilityMode ? 'bg-gray-900 border-gray-700' : ''} transition-all duration-300`}>
              <CardHeader>
                <CardTitle 
                  className={`flex items-center gap-2 ${accessibilityMode ? 'text-white' : 'text-gov-blue'}`}
                  onClick={() => speakText('Основные контакты')}
                >
                  <Icon name="MapPin" size={24} />
                  Основные контакты
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { 
                    icon: 'MapPin', 
                    label: 'Адрес', 
                    value: 'Котласский МО, Архангельская область' 
                  },
                  { 
                    icon: 'Phone', 
                    label: 'Телефон', 
                    value: '+7 (xxx) xxx-xx-xx' 
                  },
                  { 
                    icon: 'Mail', 
                    label: 'Email', 
                    value: 'info@muk-kdo.ru' 
                  },
                  { 
                    icon: 'Clock', 
                    label: 'Режим работы', 
                    value: 'Пн-Пт: 9:00-18:00' 
                  }
                ].map((contact, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-3 cursor-pointer"
                    onClick={() => speakText(`${contact.label}: ${contact.value}`)}
                  >
                    <Icon 
                      name={contact.icon as any} 
                      size={20} 
                      className={`mt-0.5 ${accessibilityMode ? 'text-yellow-400' : 'text-gov-blue'}`} 
                    />
                    <div>
                      <p className={`font-medium ${accessibilityMode ? 'text-white' : 'text-gray-900'} ${
                        fontSize === 'large' ? 'text-base' : fontSize === 'xlarge' ? 'text-lg' : 'text-sm'
                      }`}>
                        {contact.label}
                      </p>
                      <p className={`${accessibilityMode ? 'text-gray-300' : 'text-gray-600'} ${
                        fontSize === 'large' ? 'text-base' : fontSize === 'xlarge' ? 'text-lg' : 'text-sm'
                      }`}>
                        {contact.value}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className={`${accessibilityMode ? 'bg-gray-900 border-gray-700' : ''} transition-all duration-300`}>
              <CardHeader>
                <CardTitle 
                  className={`flex items-center gap-2 ${accessibilityMode ? 'text-white' : 'text-gov-blue'}`}
                  onClick={() => speakText('Полезные ссылки')}
                >
                  <Icon name="ExternalLink" size={24} />
                  Полезные ссылки
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: 'Госуслуги', url: 'https://gosuslugi.ru' },
                  { label: 'Официальный портал КМО', url: '#' },
                  { label: 'Министерство культуры', url: '#' },
                  { label: 'Оценка качества услуг', url: 'https://bus.gov.ru/qrcode/rate/789976' }
                ].map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 p-3 rounded-lg transition-all ${
                      accessibilityMode 
                        ? 'text-yellow-400 hover:bg-yellow-400 hover:text-black' 
                        : 'text-gov-blue hover:bg-gov-blue hover:text-white'
                    } border ${accessibilityMode ? 'border-gray-700' : 'border-gray-200'}`}
                    onClick={() => speakText(link.label)}
                  >
                    <Icon name="ExternalLink" size={16} />
                    <span className={fontSize === 'large' ? 'text-base' : fontSize === 'xlarge' ? 'text-lg' : 'text-sm'}>
                      {link.label}
                    </span>
                  </a>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`mt-16 border-t ${
        accessibilityMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
      } transition-all duration-300`}>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className={`${
              fontSize === 'large' ? 'text-base' : fontSize === 'xlarge' ? 'text-lg' : 'text-sm'
            } ${accessibilityMode ? 'text-gray-400' : 'text-gray-600'}`}>
              © 2024 МУК "КДО КМО". Все права защищены.
            </p>
            <p className={`mt-2 ${
              fontSize === 'large' ? 'text-base' : fontSize === 'xlarge' ? 'text-lg' : 'text-sm'
            } ${accessibilityMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Котласский Муниципальный Округ, Архангельская область
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;