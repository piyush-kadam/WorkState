// app/work/page.js
export const metadata = {
  title: "Work - WorkState",
};

export default function WorkPage() {
  return (
    <section className="px-8 py-20">
      <h1 className="text-4xl font-bold mb-6">Our Work</h1>
      <p className="text-gray-700 leading-relaxed">
        Here’s a showcase of our recent projects, highlighting the creativity and technical expertise
        we bring to every collaboration. Each project is crafted to meet our client’s vision while
        delivering an exceptional user experience.
      </p>
      {/* Later: Add a grid of project cards here */}
    </section>
  );
}
