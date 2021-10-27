def mode(nums):
    """Return most-common number in list.

    For this function, there will always be a single-most-common value;
    you do not need to worry about handling cases where more than one item
    occurs the same number of times.

        >>> mode([1, 2, 1])
        1

        >>> mode([2, 2, 3, 3, 2])
        2
    """
    counts = {}
    for val in nums:
        counts[val] = counts.get(val, 0) + 1
    print(counts)
    
    highest_num = 0
    for val in counts:
        if highest_num > 0:
            if counts[val] > counts[highest_num]:
                highest_num = val
        else:
            highest_num = val
    return highest_num