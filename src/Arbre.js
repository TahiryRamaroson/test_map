import { Cylinder } from '@react-three/drei';

function Tree({ position }) {
  return (
    <group position={position}>
      <Cylinder args={[0.1, 0.1, 1, 32]} position={[0, 0.5, 0]}>
        <meshStandardMaterial attach="material" color="brown" />
      </Cylinder>
      <Cylinder args={[0.5, 0, 1, 32]} position={[0, 1.5, 0]}>
        <meshStandardMaterial attach="material" color="green" />
      </Cylinder>
    </group>
  );
}

export default Tree;

