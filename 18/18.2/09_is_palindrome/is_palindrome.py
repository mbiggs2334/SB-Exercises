def is_palindrome(phrase):
    """Is phrase a palindrome?

    Return True/False if phrase is a palindrome (same read backwards and
    forwards).

        >>> is_palindrome('tacocat')
        True

        >>> is_palindrome('noon')
        True

        >>> is_palindrome('robert')
        False

    Should ignore capitalization/spaces when deciding:

        >>> is_palindrome('taco cat')
        True

        >>> is_palindrome('Noon')
        True
    """
    clean_phrase = phrase.replace(' ', '').lower()
    temp_list = []
    for let in clean_phrase:
        temp_list.append(let)
    temp_list.reverse()
    backwards_str = ''.join(temp_list)
    
    if backwards_str == clean_phrase:
        return True
    else:
        return False
    