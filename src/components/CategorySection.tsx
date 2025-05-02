import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import MusicCard from './MusicCard';
import { Album, Playlist } from '../types';

interface CategorySectionProps {
  title: string;
  seeAllLink?: string;
  items: (Album | Playlist)[];
  type: 'album' | 'playlist';
}

const CategorySection: React.FC<CategorySectionProps> = ({ 
  title, 
  seeAllLink,
  items,
  type
}) => {
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        {seeAllLink && (
          <Link 
            to={seeAllLink} 
            className="flex items-center text-sm text-gray-400 hover:text-white transition-colors"
          >
            See all <ChevronRight size={16} />
          </Link>
        )}
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
        {items.map(item => (
          <MusicCard key={item.id} item={item} type={type} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;