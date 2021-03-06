import {Injectable} from "@angular/core";
import {CIFrame} from "./frame";

export interface CIFrameTabDefination {
  route: any[];
  title: string;
  router?: any;
}

export interface CIFrameSubfabDefination {
  icon: string;
  action: () => void;
  desc?: string;
}

export interface CIFrameFabDefination {
  icon: string;
  desc?: string;
  action: () => void;
  subfabs?: CIFrameSubfabDefination[];
}

@Injectable()
export class CIFrameService {
  private frame: CIFrame;

  constructor() { }

  setFrame(frame: CIFrame) {
    this.frame = frame;
  }

  setTitle(title: string) {
    this.frame.setTitle(title);
  }

  setTabs(tabs: CIFrameTabDefination[]) {
    this.frame.setTabs(tabs);
  }

  setFab(fab: CIFrameFabDefination) {
    this.frame.setFab(fab);
  }

  toggleSubfabs() {
    this.frame.toggleSubfabs();
  }
}
