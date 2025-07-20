"use client";
import WordCloud from 'react-d3-cloud';
import { projectsData } from '@/data/projects';

// La lógica para procesar los datos es la misma
const allTags = projectsData.flatMap(p => p.tags);
const tagFrequencies = allTags.reduce((acc, tag) => {
  acc[tag] = (acc[tag] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

const data = Object.keys(tagFrequencies).map(tag => ({
  text: tag,
  value: tagFrequencies[tag] * 100, // Ajustamos el valor para que el tamaño sea impactante
}));

// Función para determinar el tamaño de la fuente
const fontSizeMapper = (word: { text: string; value: number }) => Math.log2(word.value) * 5 + 16;

// Función para la rotación de las palabras (opcional)
const rotate = () => (Math.random() > 0.5 ? 0 : 90);

export default function SkillsCloud() {
  return (
    <div style={{ height: 400, width: '100%' }}>
        <WordCloud
            data={data}
            width={500}
            height={300}
            font="sans-serif"
            fontSize={fontSizeMapper}
            rotate={rotate}
            padding={2}
        />
    </div>
  );
}