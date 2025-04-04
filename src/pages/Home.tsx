import { useState } from "react";

import { SearchBar } from "@/components/SearchBar";
import { TabNavigation } from "@/components/TabNavigation";
import { DownloadButton } from "@/components/DownloadButton";
import { SkillLevelCard } from "@/components/SkillLevelCard";
import { DeveloperPathOverview } from "@/components/DeveloperPathOverview";
import { frontendLevels, backendLevels, type Level } from "@/utils/hierarchyData";
import React from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<'frontend' | 'backend' | 'kpi'>('frontend');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedLevel, setExpandedLevel] = useState<string | null>(null);

  const filterLevels = (levels: Level[]) => {
    if (!searchQuery) return levels;
    return levels.filter(
      (level) =>
        level.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        level.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const currentLevels = activeTab != 'kpi' ? (activeTab === 'frontend' ? frontendLevels : backendLevels) : [];
  const filteredLevels = filterLevels(currentLevels);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <h1 className="text-xl font-bold text-gray-900">Developer Skill Hierarchy</h1>
            </div>

            <div className="flex items-center space-x-4">
              <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              {/*<DownloadButton />*/}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab !== 'kpi' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {activeTab === 'frontend'
                ? 'Frontend (React) Developer Levels'
                : 'Backend (Node.js) Developer Levels'
              }
            </h2>
              <div className="mb-8 position-relative w-full">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Three Levels Visualization</h3>
                <img src='public/schema-2.png' className='w-[700px] h-[400px] mx-auto' alt=""/>
              </div>
              <div className="mt-10">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Detailed Skill Levels</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredLevels.map((level) => (
                    <SkillLevelCard
                      key={level.id}
                      level={level}
                      expandedLevel={expandedLevel}
                      setExpandedLevel={setExpandedLevel}
                    />
                  ))}
                </div>
                {filteredLevels.length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-gray-500">No levels match your search criteria.</p>
                  </div>
                )}
              </div>

          </div>
        )}

        {activeTab !== 'kpi' && <DeveloperPathOverview/>}
        {/*<DeveloperPathOverview/>*/}
        {/* Додаємо таблицю KPI */}

        {activeTab === 'kpi' && (
          <div>
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">KPI для Node.js-розробників</h2>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 rounded-lg bg-white">
                  <thead>
                  <tr className="bg-gray-100 border-b border-gray-300">
                    <th className="p-4 text-left font-medium border-r border-gray-300">Категорія</th>
                    <th className="p-4 text-left font-medium border-r border-gray-300">Показник (KPI)</th>
                    <th className="p-4 text-left font-medium border-r border-gray-300">Поточний результат</th>
                    <th className="p-4 text-left font-medium border-r border-gray-300">Очікуваний результат</th>
                    <th className="p-4 text-left font-medium border-r border-gray-300">GAP</th>
                    <th className="p-4 text-left font-medium">Опис</th>
                  </tr>
                  </thead>
                  <tbody>
                  {[
                    {
                      category: "Продуктивність",
                      kpis: [
                        ["Кількість виконаних задач", "Загальна кількість завершених задач у спринті."],
                        ["Легкі задачі","Кількість задач низької складності, виконаних за спринт."],
                        ["Важкі задачі", "Кількість складних задач, завершених у спринті."]
                      ]
                    },
                    {
                      category: "Код і якість",
                      kpis: [
                        ["Покриття тестами (Test Coverage)", "Відсоток коду, покритого тестами (Unit, Integration)."],
                        ["Кількість багів (Bugs per Sprint)", "Скільки багів знаходять у кожному спринті."],
                        ["Code Review пройдено з першого разу (%)", "Чи приймають зміни без додаткових виправлень."]
                      ]
                    },
                    {
                      category: "Розробка",
                      kpis: [
                        ["Швидкість розробки (Story Points per Sprint)", "Кількість виконаних задач за спринт."],
                        ["Дотримання дедлайнів (%)", "Чи встигає розробник у встановлені терміни."],
                        ["Час залучення тимліда (Team Lead Involvement Time)", "Скільки годин тимлід витратив на допомогу розробнику (код-рев’ю, консультації, вирішення проблем)."]
                      ]
                    },

                    {
                      category: "Безпека",
                      kpis: [
                        ["Виявлені вразливості (Security Issues)", "Кількість знайдених проблем безпеки."],
                        ["Виправлені вразливості (%)", "Відсоток усунутих проблем безпеки."]
                      ]
                    }
                  ].map(({category, kpis}, index) => (
                    <React.Fragment key={index}>
                      {kpis.map(([kpi, description], kpiIndex) => (
                        <tr key={kpiIndex} className="border-b border-gray-300 hover:bg-gray-50">
                          {kpiIndex === 0 ? (
                            <td className="p-4 font-semibold border-r border-gray-300" rowSpan={kpis.length}>
                              {category}
                            </td>
                          ) : null}
                          <td className="p-4 border-r border-gray-300">{kpi}</td>
                          <td className="p-4 border-r border-gray-300 text-center">-</td>
                          <td className="p-4 border-r border-gray-300 text-center">-</td>
                          <td className="p-4 border-r border-gray-300 text-center">-</td>
                          <td className="p-4">{description}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Очікування</h2>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                  <tr className="bg-gray-100 border-b border-gray-300">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">Категорія</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">Перший місяць</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">Три місяці</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Рік</th>
                  </tr>
                  </thead>
                  <tbody>
                  {[
                    {
                      category: "Ознайомлення з проєктом",
                      month1: "Розбір коду, налаштування середовища",
                      month3: "Робота з API та базами даних",
                      year: "Глибоке розуміння архітектури"
                    },
                    {
                      category: "Продуктивність",
                      month1: "Виконання перших тасків",
                      month3: "Реалізація складних фіч",
                      year: "Самостійне ведення завдань та оптимізація процесів"
                    },
                    {
                      category: "Кодстайл та тестування",
                      month1: "Ознайомлення з правилами",
                      month3: "Написання unit-тестів",
                      year: "Впровадження best practices та code review"
                    },
                    {
                      category: "Робота з API",
                      month1: "Інтеграція з бекендом",
                      month3: "Оптимізація запитів",
                      year: "Масштабування API та кешування"
                    },
                    {
                      category: "Оптимізація",
                      month1: "Основи продуктивності",
                      month3: "Робота з асинхронністю",
                      year: "Глибоке налаштування та рефакторинг"
                    },
                    {
                      category: "Безпека",
                      month1: "Ознайомлення з основами",
                      month3: "Реалізація автентифікації",
                      year: "Захист API, RBAC, DDoS-захист"
                    },
                    {category: "Менторство", month1: "Робота в команді", month3: "Участь у код-рев'ю", year: "Менторинг молодших розробників"},
                  ].map((item, index) => (
                    <tr key={index} className="border-b border-gray-300">
                      <td className="px-6 py-4 text-gray-900 font-medium border-r border-gray-300">{item.category}</td>
                      <td className="px-6 py-4 text-gray-700 border-r border-gray-300">{item.month1}</td>
                      <td className="px-6 py-4 text-gray-700 border-r border-gray-300">{item.month3}</td>
                      <td className="px-6 py-4 text-gray-700">{item.year}</td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-8">

              <div className="overflow-x-auto">
                {/* Таблиця для React */}
                <h3 className="text-lg font-bold text-gray-800 mt-6 mb-4">React розробник</h3>
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                  <tr className="bg-gray-100 border-b border-gray-300">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">Рівень</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">Перший місяць</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">Три місяці</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Рік</th>
                  </tr>
                  </thead>
                  <tbody>
                  {[
                    {
                      level: "Junior",
                      month: "Ознайомлення з проєктом, перші таски",
                      threeMonths: "Розробка компонентів, тестування",
                      year: "Підтримка проєкту, рефакторинг"
                    },
                    {
                      level: "Middle",
                      month: "Реалізація компонентів, робота з API",
                      threeMonths: "Оптимізація рендерингу, state management",
                      year: "Архітектура компонентів, code review"
                    },
                    {
                      level: "Senior",
                      month: "Планування архітектури",
                      threeMonths: "Performance optimization",
                      year: "Технічне лідерство, менторинг"
                    },
                  ].map((item, index) => (
                    <tr key={index} className="border-b border-gray-300">
                      <td className="px-4 py-4 font-medium border-r border-gray-300">{item.level}</td>
                      <td className="px-4 py-4 border-r border-gray-300">{item.month}</td>
                      <td className="px-4 py-4 border-r border-gray-300">{item.threeMonths}</td>
                      <td className="px-4 py-4">{item.year}</td>
                    </tr>
                  ))}
                  </tbody>
                </table>

                {/* Таблиця для Node.js */}
                <h3 className="text-lg font-bold text-gray-800 mt-6 mb-4">Node.js (backend) розробник</h3>
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                  <tr className="bg-gray-100 border-b border-gray-300">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">Рівень</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">Перший місяць</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-r border-gray-300">Три місяці</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Рік</th>
                  </tr>
                  </thead>
                  <tbody>
                  {[
                    {
                      level: "Junior",
                      month: "Ознайомлення з API, бази даних",
                      threeMonths: "Розробка CRUD операцій",
                      year: "Оптимізація, кешування, робота з чергами"
                    },
                    {
                      level: "Middle",
                      month: "Робота з мікросервісами",
                      threeMonths: "Оптимізація запитів, кешування",
                      year: "Архітектура системи, безпека API"
                    },
                    {
                      level: "Senior",
                      month: "Проєктування архітектури",
                      threeMonths: "Балансування навантаження, security best practices",
                      year: "Технічне лідерство, DevOps інтеграція"
                    },
                  ].map((item, index) => (
                    <tr key={index} className="border-b border-gray-300">
                      <td className="px-4 py-4 font-medium border-r border-gray-300">{item.level}</td>
                      <td className="px-4 py-4 border-r border-gray-300">{item.month}</td>
                      <td className="px-4 py-4 border-r border-gray-300">{item.threeMonths}</td>
                      <td className="px-4 py-4">{item.year}</td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mt-6 mb-4">Soft Skills</h3>
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="px-4 py-3 border-r border-gray-300">Категорія</th>
                <th className="px-4 py-3 border-r border-gray-300">Поточний рівень</th>
                <th className="px-4 py-3 border-r border-gray-300">Очікуваний рівень</th>
                <th className="px-4 py-3 border-r border-gray-300">GAP</th>
                <th className="px-4 py-3 border-r border-gray-300">Категорія</th>
              </tr>
              </thead>
              <tbody>
              {[
                {category: "Communication", description: "Регулярні тренінги з комунікаційних навичок"},
                {category: "Team Collaboration", description: "Впровадження командних проєктів"},
                {category: "Problem Solving", description: "Завдання на вирішення критичних проблем"},
                {category: "Time Management", description: "Тренінг з ефективного розподілу часу"},
                {category: "Adaptability", description: "Симуляції для адаптації в умовах змін"},
                {category: "Critical Thinking", description: "Курс із розвитку критичного мислення"},
                {category: "Conflict Resolution", description: "Навчання технікам управління конфліктами"},
                {category: "Work Ethic", description: "Менторство для підвищення відповідальності"},
                {category: "Emotional Intelligence (EQ)", description: "Практика усвідомленості та емоційного управління"},
              ].map((item, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="px-4 py-4 border-r border-gray-300">{item.category}</td>
                  <td className="px-4 py-4 border-r border-gray-300 text-center">-</td>
                  <td className="px-4 py-4 border-r border-gray-300 text-center">-</td>
                  <td className="px-4 py-4 border-r border-gray-300 text-center">-</td>
                  <td className="px-4 py-4 border-r border-gray-300">{item.description}</td>

                </tr>
              ))}
              </tbody>
            </table>
          </div>


        )}
      </main>


      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            Developer Skill Hierarchy Visualization Tool
          </p>
        </div>
      </footer>
    </div>
  );
}
