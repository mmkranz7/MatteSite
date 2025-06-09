import gsap from "gsap";

export function horizontalLoop(
  items: string | HTMLElement[] | NodeListOf<HTMLElement>,
  config: {
    speed?: number;
    repeat?: number;
    paddingRight?: number;
    reversed?: boolean;
  } = {}
): gsap.core.Timeline & { direction: number } {
  const { speed = 1, repeat = -1, paddingRight = 0, reversed = false } = config;

  const elements: HTMLElement[] =
    typeof items === "string"
      ? Array.from(document.querySelectorAll<HTMLElement>(items))
      : Array.from(items);

  const totalWidth = elements.reduce((acc, el) => {
    return acc + el.offsetWidth + paddingRight;
  }, 0);

  const tl = gsap.timeline({
    repeat,
    defaults: { ease: "none" },
    paused: speed === 0,
  }) as gsap.core.Timeline & { direction: number };

  const positions: number[] = [];

  elements.forEach((el) => {
    positions.push(el.offsetLeft);
  });

  elements.forEach((el, i) => {
    const distance = reversed
      ? -(positions[i] + el.offsetWidth + paddingRight)
      : totalWidth - positions[i];

    tl.to(
      el,
      {
        x: reversed ? `-=${distance}` : `-=${distance}`,
        duration: distance / (100 * speed),
      },
      0
    );
  });

  tl.direction = reversed ? -1 : 1;
  return tl;
}
