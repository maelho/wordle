import { NUM_OF_GUESSES_ALLOWED } from "@/constants";
import { range } from "@/utils";
import GuessRow from "./guess-row";

type GuessGridProps = {
  guesses: string[];
  answer: string;
};

export default function GuessGrid({ guesses, answer }: GuessGridProps) {
  return (
    <div className="flex flex-col gap-1 md:gap-2">
      {range(NUM_OF_GUESSES_ALLOWED).map((index) => (
        <GuessRow answer={answer} key={index} value={guesses[index]} />
      ))}
    </div>
  );
}
