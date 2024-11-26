import { PelosiArticle } from './PelosiArticle';
import { CrenshawArticle } from './CrenshawArticle';
import { GottheimerArticle } from './GottheimerArticle';

export const articles = [
  {
    id: 1,
    title: "Die Pelosi-Methode: Wie die ehemalige Speakerin des US-Kongresses ein Vermögen an der Börse macht",
    subtitle: "Eine exklusive Analyse der Handelsstrategie von Nancy Pelosi",
    slug: "PelosiMethode",
    component: PelosiArticle
  },
  {
    id: 2,
    title: "Dan Crenshaws 400% Rendite: Der texanische Kongressabgeordnete und seine Energy-Trades",
    subtitle: "Wie der Republikaner den Energieboom vorhersah",
    slug: "CrenshawEnergyTrades",
    component: CrenshawArticle
  },
  {
    id: 3,
    title: "Die Tech-Strategie von Josh Gottheimer: 245% mit Halbleiter-Aktien",
    subtitle: "Der demokratische Kongressabgeordnete und seine perfekt getimten Tech-Investments",
    slug: "GottheimerTechStrategie",
    component: GottheimerArticle
  }
];