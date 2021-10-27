def flip_case(phrase, to_swap):
    """Flip [to_swap] case each time it appears in phrase.

        >>> flip_case('Aaaahhh', 'a')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'A')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'h')
        'AaaaHHH'

    """
    new_string = ''
    for letter in phrase:
        if to_swap.lower() == letter.lower():
            new_string += letter.swapcase()
        else:
            new_string += letter
    return new_string