declare module "locomotive-scroll" {
  export default class LocomotiveScroll {
    constructor(options?: any);
    destroy(): void;
    update(): void;
    stop(): void;
    start(): void;
    scrollTo(target: any, options?: any): void;
  }
}
