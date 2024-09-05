import { Imgs } from "../../constants";

const AboutPage = () => {
  return (
    <>
      <main>
        <section className="px-8 md:px-12 lg:px-16 py-16 md:py-20 lg:py-28 flex flex-col justify-center gap-3 md:gap-4 lg:gap-6">
          <h1 className="text-3xl font-bold tracking-tighter md:text-5xl lg:text-6xl/none">
            About Us
          </h1>
          <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-12">
            <div className="gap-2 flex flex-col">
              <h2 className="text-xl font-medium tracking-tighter md:text-2xl lg:text-3xl/none">
                Our Mission
              </h2>
              <p className="text-muted-foreground text-balance md:text-base/relaxed lg:text-lg/snug">
                Our mission is to bring together the brightest minds in the field of science and
                technology to drive innovation and progress. We are committed to fostering a
                collaborative environment where ideas can flourish and solutions can be found to the
                world's most pressing challenges.
              </p>
            </div>
            <div className="gap-2 flex flex-col">
              <h2 className="text-xl font-medium tracking-tighter md:text-2xl lg:text-3xl/none">
                Our vision
              </h2>
              <p className="text-muted-foreground text-balance md:text-base/relaxed lg:text-lg/snug">
                Our vision is to be a leading hub for scientific and technological advancement,
                where the most innovative thinkers and doers come together to push the boundaries of
                what's possible. We aim to inspire and empower the next generation of scientists,
                engineers, and entrepreneurs to create a better future for all.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-muted-background px-8 md:px-12 lg:px-16 py-16 md:py-20 lg:py-28 flex flex-col justify-center gap-3 md:gap-4 lg:gap-6">
          <h2 className="text-xl font-medium tracking-tighter md:text-2xl lg:text-3xl/none">
            Our History
          </h2>
          <div className="flex flex-wrap gap-4 md:gap-6 lg:gap-12">
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
              <div key={index} className="gap-2 flex flex-col lg:w-[calc(calc(100%-3rem)/2)]">
                <h2 className="text-lg font-medium tracking-tighter md:text-xl lg:text-2xl/none">
                  {title}
                </h2>
                <p className="text-muted-foreground text-base/relaxed text-balance lg:text-lg/snug">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-8 md:px-12 lg:px-16 py-16 md:py-20 lg:py-28 flex flex-col justify-center gap-3 md:gap-4 lg:gap-6">
          <h2 className="text-xl font-medium tracking-tighter md:text-2xl lg:text-3xl/none">
            The Organizers
          </h2>
          <div className="flex flex-wrap gap-4 md:gap-6 lg:gap-12">
            {[
              { name: "Desire Koussawo", job: "Co-founder", image: "Desire-Koussawo.jpg" },
              {
                name: "Dr. Kaoutar El Maghraoui",
                job: "Co-founder",
                image: "Dr.-Kaoutar-El-Maghraoui.png",
              },
              { name: "Kahi Lumumba", job: "Executive Director", image: "Kahi-Lumumba.png" },
              {
                name: "Osamede UWUBANMWEN",
                job: "Program Manager",
                image: "Osamede-UWUBANMWEN.jpg",
              },
              { name: "Oscar Pierre", job: "Program Manager", image: "Oscar-Pierre.jpg" },
            ].map(({ image, job, name }, index) => (
              <div
                key={index}
                className="flex flex-col w-full md:w-[calc(calc(100%-calc(2*1.5rem))/3)] lg:w-[calc(calc(100%-calc(4*3rem))/5)]"
              >
                <img
                  className="mb-3 aspect-[1/1.25] object-cover border rounded"
                  src={Imgs.getImageUrl(image, "organizates")}
                  alt={`${name}'s image`}
                />
                <h2 className="text-base capitalize font-medium tracking-tighter md:text-lg lg:text-xl/none">
                  {name}
                </h2>
                <p className="text-muted-foreground text-sm/relaxed text-balance lg:text-base/snug">
                  {job}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-muted-background px-8 md:px-12 lg:px-16 py-16 md:py-20 lg:py-28 flex flex-col justify-center gap-3 md:gap-4 lg:gap-6">
          <h2 className="text-xl font-medium tracking-tighter md:text-2xl lg:text-3xl/none">
            The Scientific Committee
          </h2>
          <div className="flex flex-wrap gap-4 md:gap-6 lg:gap-12">
            {[
              {
                name: "Dr. Rachel Lim",
                job: "Artificial Intelligence",
                image: "Thebe-Ikalafeng.jpg",
              },
              { name: "Prof. Jian Park", job: "Quantum Computing", image: "Toba-Tanama.jpg" },
              { name: "Dr. Ty Heath", job: "Materials Science", image: "Ty-Heath.jpg" },
            ].map(({ name, job, image }, index) => (
              <div
                key={index}
                className="flex items-center flex-col w-full md:w-[calc(calc(100%-calc(2*3rem))/3)] lg:w-[calc(calc(100%-calc(4*3rem))/5)]"
              >
                <img
                  className="mb-3 aspect-square object-cover w-1/2 border rounded-full"
                  src={Imgs.getImageUrl(image, "comittee-scientifique")}
                  alt={`${name}'s image`}
                />
                <h2 className="text-base capitalize font-medium tracking-tighter md:text-lg lg:text-xl/none">
                  {name}
                </h2>
                <p className="text-muted-foreground text-sm/relaxed text-balance lg:text-base/snug">
                  {job}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-8 md:px-12 lg:px-16 py-16 md:py-20 lg:py-28 flex flex-col justify-center gap-3 md:gap-4 lg:gap-6">
          <h2 className="text-xl font-medium tracking-tighter md:text-2xl lg:text-3xl/none">
            Partners & Sponsors
          </h2>
          <div className="flex flex-wrap px-4 gap-x-6 gap-y-8 md:px-6 md:gap-x-10 lg:gap-x-16 lg:px-12">
            {[
              "AG-Partners.png",
              "Amazon-Web-Services.png",
              "Brand-AFRICA.png",
              "Glovo-logo-Green.png",
              "Meta_Lockup_PositivePrimary_RGB.png",
              "Sages-Noir.png",
              "UM6P-Primary-Lockup-Web.png",
            ].map((image, index) => (
              <img
                key={index}
                className="aspect-square w-[calc(calc(100%-calc(2*1.5rem))/3)] md:w-[calc(calc(100%-calc(4*2.5rem))/5)] lg:w-[calc(calc(100%-calc(7*4rem))/8)]"
                src={Imgs.getImageUrl(image, "partners-sponsors")}
                alt={`sponsor-${index}`}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default AboutPage;
