import { Product } from "@/types/product";

export const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    slug: "fone-bluetooth-anc-pro",
    title: "Fone de Ouvido Bluetooth Pro com Cancelamento Ativo de Ruído (ANC)",
    tagline: "Som imersivo de alta definição, bateria de 36 horas e isolamento acústico total.",
    price: 189.9,
    originalPrice: 349.9,
    installments: "12x de R$ 18,90",
    rating: 4.9,
    reviewsCount: 384,
    stockLeft: 7,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80",
    ],
    variants: {
      colors: [
        { name: "Preto Matte", hex: "#18181b" },
        { name: "Branco Glacial", hex: "#f4f4f5" },
        { name: "Azul Meia-Noite", hex: "#1e3a8a" },
      ],
    },
    features: [
      "Cancelamento Ativo de Ruído de até 35dB",
      "Conexão Bluetooth 5.3 ultra estável sem delay",
      "Bateria para 36 horas de reprodução contínua",
      "Resistência à água e suor IPX5",
      "Microfones inteligentes para chamadas cristalinas",
    ],
    description:
      "Desenvolvido para amantes de música e produtividade extrema. Com cancelamento ativo de ruído inteligente, drivers de titânio de 40mm e design ergonômico que não cansa o ouvido mesmo após horas de uso contínuo.",
  },
  {
    id: "prod-2",
    slug: "smartwatch-titanium-ultra",
    title: "Smartwatch Titanium Ultra Series 9 com Monitor Cardíaco e GPS",
    tagline: "Resistência militar, tela AMOLED infinita e mais de 100 modos esportivos.",
    price: 249.9,
    originalPrice: 499.0,
    installments: "12x de R$ 24,90",
    rating: 4.8,
    reviewsCount: 512,
    stockLeft: 4,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80",
    ],
    variants: {
      colors: [
        { name: "Titânio Natural", hex: "#a1a1aa" },
        { name: "Preto Carbono", hex: "#27272a" },
        { name: "Laranja Aventura", hex: "#ea580c" },
      ],
    },
    features: [
      "Caixa em liga de titânio ultra resistente",
      "Monitoramento de sono, pressão e oxímetro SpO2",
      "Recebe e atende ligações direto do pulso",
      "Bateria de longa duração: até 10 dias sem recarregar",
    ],
    description:
      "O relógio inteligente definitivo para o seu dia a dia e treinos. Design robusto inspirado nos modelos de expedição, resistente a choques e mergulhos.",
  },
  {
    id: "prod-3",
    slug: "mini-projetor-4k-portatil",
    title: "Mini Projetor Portátil Smart Cinema 4K com Android e Wi-Fi 6",
    tagline: "Transforme qualquer parede em uma tela de cinema de até 150 polegadas.",
    price: 389.9,
    originalPrice: 699.9,
    installments: "12x de R$ 38,90",
    rating: 4.9,
    reviewsCount: 228,
    stockLeft: 5,
    images: [
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&q=80",
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80",
    ],
    variants: {
      colors: [
        { name: "Branco Neve", hex: "#ffffff" },
        { name: "Grafite Espacial", hex: "#374151" },
      ],
    },
    features: [
      "Resolução com suporte a 4K e rotação 180°",
      "Netflix, YouTube e Prime Video já instalados",
      "Alto-falante estéreo Hi-Fi embutido",
      "Espelhamento direto do iPhone e Android",
    ],
    description:
      "Leve o cinema com você para onde for. Ideal para filmes na cama, no teto, salas de reunião ou acampamentos.",
  },
  {
    id: "prod-4",
    slug: "massageador-cervical-ems-pro",
    title: "Massageador Cervical e Lombar Portátil EMS com Aquecimento Térmico",
    tagline: "Alívio imediato de dores no pescoço, costas e ombros em menos de 15 minutos.",
    price: 129.9,
    originalPrice: 249.9,
    installments: "12x de R$ 12,90",
    rating: 4.9,
    reviewsCount: 642,
    stockLeft: 8,
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
    ],
    variants: {
      colors: [
        { name: "Preto Nobre", hex: "#18181b" },
        { name: "Branco Pérola", hex: "#f4f4f5" },
      ],
    },
    features: [
      "Tecnologia EMS com 8 modos de pulso e 19 intensidades",
      "Compressa quente de 42°C para relaxamento muscular profundo",
      "Design anatômico ergonômico e ultraleve (apenas 160g)",
      "Recarregável via USB com desligamento automático inteligente",
    ],
    description:
      "Diga adeus ao estresse e às dores musculares acumuladas no trabalho. O Massageador Cervical Pro combina pulsação eletromagnética TENS/EMS com aquecimento constante, estimulando a circulação sanguínea e relaxando a musculatura tensa em minutos.",
  },
];
