def list_check(lst):
    """Are all items in lst a list?

        >>> list_check([[1], [2, 3]])
        True

        >>> list_check([[1], "nope"])
        False
    """
    val = True
    for itm in lst:
        if type(itm) != list:
            val = False
    return val