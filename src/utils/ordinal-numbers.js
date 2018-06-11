export default function ordinalNumbers(start = 0) {
  const gen = ordinalGenerator(start);

  return () => gen.next().value;
}

function* ordinalGenerator(start = 0) {
  let i = start;
  while (true) {
      yield i++;
  }
}