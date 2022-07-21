import mitt from "mitt";

type Events = {
  asideCollapse: undefined;
};

export default mitt<Events>(); // inferred as Emitter<Events>
