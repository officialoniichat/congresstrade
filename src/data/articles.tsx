import { PelosiArticle } from './articles/PelosiArticle';
import { CrenshawArticle } from './articles/CrenshawArticle';
import { GottheimerArticle } from './articles/GottheimerArticle';
import { PerdueArticle } from './articles/PerdueArticle';

export const articles = [
  {
    id: 1,
    title: "Die Pelosi-Methode: Wie die ehemalige Speakerin des US-Kongresses ein Vermögen an der Börse macht",
    subtitle: "Eine exklusive Analyse der Handelsstrategie von Nancy Pelosi",
    slug: "pelosi-methode",
    component: PelosiArticle
  },
  {
    id: 2,
    title: "Dan Crenshaws 400% Rendite: Der texanische Kongressabgeordnete und seine Energy-Trades",
    subtitle: "Wie der Republikaner den Energieboom vorhersah",
    slug: "crenshaw-energy-trades",
    component: CrenshawArticle
  },
  {
    id: 3,
    title: "Die Tech-Strategie von Josh Gottheimer: 245% mit Halbleiter-Aktien",
    subtitle: "Der demokratische Kongressabgeordnete und seine perfekt getimten Tech-Investments",
    slug: "gottheimer-tech-strategie",
    component: GottheimerArticle
  },
  {
    id: 4,
    title: "David Perdue: Der Trading-Senator mit über 2.600 Trades in sechs Jahren",
    subtitle: "Einblicke in die Handelsstrategie eines der aktivsten Händler im US-Senat",
    slug: "perdue-trading-strategie",
    component: PerdueArticle
  }
];