import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

function ThreeBackground() {
  return (
    <Canvas className="absolute inset-0 -z-10">
      <ambientLight intensity={0.5} />
      <Stars />
    </Canvas>
  );
}

export default ThreeBackground;
