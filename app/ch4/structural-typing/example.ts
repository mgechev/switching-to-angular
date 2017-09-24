interface Namable {
  name: string;
}

class Cat {
  name: string;
}

class Castle {
  name: string;
  capacity: string;
}

const formatName = (obj: Namable) => `The name is ${obj.name}`;

const cat = new Cat();
cat.name = 'Kitty';
console.log(formatName(cat));

const castle = new Castle();
castle.name = 'Hogwarts';
console.log(formatName(castle));
