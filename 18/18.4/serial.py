"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """
    def __init__(self, start=0):
        self.num = start
        self.starting_num = start
    def __repr__(self):
        return f'Serial Number: {self.num} Start={self.starting_num} Next={self.num + 1}'
    def generate(self):
        self.num += 1
        return self.num
    def reset(self):
        self.num = self.starting_num
        return self.num