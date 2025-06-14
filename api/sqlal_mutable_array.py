from sqlalchemy.ext.mutable import Mutable

class MutableList(Mutable, list):
  def append(self, value):
    list.append(self, value)
    self.changed()

  def pop(self, index=0):
    value = list.pop(self, index)
    self.changed()
    return value

  def set(self, newlist):
    for i in range(len(self)):
      self[i] = newlist[i]
      self.changed()

  @classmethod
  def coerce(cls, key, value):
    if not isinstance(value, MutableList):
      if isinstance(value, list):
        return MutableList(value)
      return Mutable.coerce(key, value)
    else:
      return value