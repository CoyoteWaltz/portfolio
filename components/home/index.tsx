import { Logo } from '../logo'

import { Typical } from '../typical'

export function Home() {
  return (
    <>
      <div className="relative flex h-[30rem] justify-center items-center px-3 font-home w-full bg-gradient-to-tl \
    from-[#b5fffc] from-[5%] via-[#ffdee9] via-[33%] to-white\
      dark:from-[#021305] dark:from-[5%] dark:via-[#087676] dark:via-[55%] \
      dark:to-[#00e6c7]
    ">
        <div className="absolute top-0 left-0 h-4/5 opacity-5">
          <Logo disableHoverAnimation />
        </div>
        <span className="md:text-[2rem] mobile:text-[1.2rem] text-[#c2730b] dark:nx-text-primary-600">
          <Typical
            texts={['Constantly Put Something In Your Portfolio']}
          />
        </span>
      </div>
    </>
  )
}
