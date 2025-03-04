import markdown from "../markdown.js";

export default async function ExerciseContentByHash(hash) {
    let request = await fetch(`exercises/${hash}/description.md`);
    if (request.status === 200) {
        return markdown(await request.text());
    }
}