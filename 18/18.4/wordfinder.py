"""Word Finder: finds random words from a dictionary."""
from random import randrange

class WordFinder:
    def __init__(self):
        self.word_list = list(open('words.txt', 'r'))
        self.word_count = 0
        for num in self.word_list:
            self.word_count +=1
    def __repr__(self):
        return f'(WordFinder word_count={self.word_count})'        
    def random(self):
       index = randrange(len(self.word_list))
       random_word = self.word_list[index]
       return random_word[0:-1:]
    
class SpecialWordFinder(WordFinder):
    def __init__(self):
        super().__init__()
        self.clean_word_list = [w.strip() for w in self.word_list
                                if w.strip() and not w.startswith('#')]
    def random(self):
        return super().random()