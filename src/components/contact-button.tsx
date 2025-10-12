'use client'

import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'

export function ContactButton({ text = 'Arrange a Free Pilot' }: { text?: string }) {
  const handleContactClick = () => {
    const contactsSection = document.getElementById('contacts');
    if (contactsSection) {
      contactsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Button
      size={'lg'}
      className="h-fit border-4 transition-all duration-200 ease-out hover:scale-105 hover:shadow-md"
      onClick={handleContactClick}
    >
      <div className="flex h-fit items-center px-2 py-3 lg:text-lg xl:text-xl">
        <ArrowRight className="mr-2 size-4" />
        {text}
      </div>
    </Button>
  );
}