const AboutPage = () => {
  return (
    <>
      <main>
        <section className="px-16 py-28 flex flex-col justify-center  gap-3 sm:gap-4 xl:gap-6">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
            About Us
          </h1>
          <div className="flex gap-4 sm:gap-6 xl:gap-12">
            <div className="gap-2 flex flex-col">
              <h2 className="text-xl font-medium tracking-tighter sm:text-2xl xl:text-3xl/none">
                Our Mission
              </h2>
              <p className="text-muted-foreground text-balance md:text-xl/relaxed lg:text-base/relaxed xl:text-lg/snug">
                Our mission is to bring together the brightest minds in the field of science and
                technology to drive innovation and progress. We are committed to fostering a
                collaborative environment where ideas can flourish and solutions can be found to the
                world's most pressing challenges.
              </p>
            </div>
            <div className="gap-2 flex flex-col">
              <h2 className="text-xl font-medium tracking-tighter sm:text-2xl xl:text-3xl/none">
                Our vision
              </h2>
              <p className="text-muted-foreground text-balance md:text-xl/relaxed lg:text-base/relaxed xl:text-lg/snug">
                Our vision is to be a leading hub for scientific and technological advancement,
                where the most innovative thinkers and doers come together to push the boundaries of
                what's possible. We aim to inspire and empower the next generation of scientists,
                engineers, and entrepreneurs to create a better future for all.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-muted px-16 py-28 flex flex-col justify-center  gap-3 sm:gap-4 xl:gap-6">
          <h2 className="text-xl font-medium tracking-tighter sm:text-2xl xl:text-3xl/none">
            Our History
          </h2>
          <div className="flex flex-wrap gap-4 sm:gap-6 xl:gap-12">
            {[
              [
                "2010 - 2015",
                "Our organization was founded in 2010 with the goal of bringing together the brightest minds in science and technology. In the early years, we focused on building a strong foundation and establishing our presence in the community.",
              ],
              [
                "2016 - 2021",
                "During this period, we expanded our reach and began organizing larger-scale events and conferences. We established partnerships with leading universities and research institutions, and our work gained recognition on the global stage.",
              ],
              [
                "2022 - Present",
                "In recent years, we have continued to grow and evolve, adapting to the changing needs of the scientific community. We have launched new initiatives and programs to support emerging researchers and entrepreneurs, and our impact has only continued to expand.",
              ],
            ].map(([title, description], index) => (
              <div key={index} className="gap-2 flex flex-col xl:w-[calc(calc(100%-3rem)/2)]">
                <h2 className="text-lg font-medium tracking-tighter sm:text-xl xl:text-2xl/none">
                  {title}
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed text-balance lg:text-base/relaxed xl:text-lg/snug">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default AboutPage;
