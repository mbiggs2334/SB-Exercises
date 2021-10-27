def repeat(phrase, num):
    """Return phrase, repeated num times.

        >>> repeat('*', 3)
        '***'

        >>> repeat('abc', 2)
        'abcabc'

        >>> repeat('abc', 0)
        ''

    Ignore illegal values of num and return None:

        >>> repeat('abc', -1) is None
        True

        >>> repeat('abc', 'nope') is None
        True
    """

    # My method
    # if type(num) != int or num < 0:
    #     return None
    # new_string = ''
    # new_list = range(1,num+1)
    # for num in new_list:
    #     new_string += phrase
    # return new_string


    if not isinstance(num, int) or num < 0:
        return None

    return phrase * num