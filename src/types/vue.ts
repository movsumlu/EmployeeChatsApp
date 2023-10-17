import { VNodeData, VNode } from "vue";
import { Component, Vue, Prop, Ref, Watch } from "vue-property-decorator";

type CSSClass =
  | string
  | string[]
  | {
      [key: string]: any;
    };

interface DefaultAttrs {
  class?: CSSClass | CSSClass[];
  key?: string | number;
  style?: VNodeData["style"];
  ref?: VNodeData["ref"];
}

export class VueComponent<P = any> extends Vue {
  public $props!: P & DefaultAttrs;
}

export { Vue, Component, Prop, Ref, Watch, VNode };
