def print_upper_words(word_list, letters):
    """Turns all strings in the list to uppercase"""

    for word in word_list:
        for letter in letters:
            if word[0] == letter:
                print(word.upper())

print_upper_words(['banana', 'dog', 'cat'], ['a', 'b', 'c',])