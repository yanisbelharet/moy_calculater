import { Unit, EvaluationMode } from './types';

export const CURRICULUM: Unit[] = [
  {
    id: 'uef1',
    name: 'UE Fondamentale',
    code: 'UEF1(O/P)',
    modules: [
      {
        id: 'ml',
        name: 'Apprentissage automatique',
        coeff: 3,
        credits: 6,
        mode: EvaluationMode.MIXED
      },
      {
        id: 'bdd',
        name: 'Bases de données avancées',
        coeff: 3,
        credits: 6,
        mode: EvaluationMode.SPLIT
      },
      {
        id: 'networks',
        name: 'Réseaux avancés',
        coeff: 3,
        credits: 6,
        mode: EvaluationMode.SPLIT
      }
    ]
  },
  {
    id: 'uem1',
    name: 'UE Méthodologie',
    code: 'UEM1(O/P)',
    modules: [
      {
        id: 'python',
        name: 'Python avancé pour la science des données',
        coeff: 2,
        credits: 4,
        mode: EvaluationMode.MIXED
      },
      {
        id: 'img_proc',
        name: "Traitement et analyse d'images",
        coeff: 3,
        credits: 5,
        mode: EvaluationMode.MIXED
      }
    ]
  },
  {
    id: 'ued1',
    name: 'UE Découverte',
    code: 'UED1(O/P)',
    modules: [
      {
        id: 'cloud',
        name: 'Cloud Computing et Big Data',
        coeff: 2,
        credits: 2,
        mode: EvaluationMode.MIXED
      }
    ]
  },
  {
    id: 'uet1',
    name: 'UE Transversale',
    code: 'UET1(O/P)',
    modules: [
      {
        id: 'seminars',
        name: 'Séminaires et workshops',
        coeff: 1,
        credits: 1,
        mode: EvaluationMode.SINGLE
      }
    ]
  }
];