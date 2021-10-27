def reverse_string(phrase):
    """Reverse string,

        >>> reverse_string('awesome')
        'emosewa'

        >>> reverse_string('sauce')
        'ecuas'
    """
    temp_list = []
    for letter in phrase:
        temp_list.append(letter)
    temp_list.reverse()
    return ''.join(temp_list)