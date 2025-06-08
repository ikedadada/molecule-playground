import { useSprings } from '@react-spring/three';
import { a } from '@react-spring/three';
import type { SpringValue } from '@react-spring/three';
import { OrbitControls, Text } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import type React from 'react';
import { useEffect, useRef } from 'react';

export interface AtomPosition {
    symbol: string;
    color: string;
    x: number;
    y: number;
    z: number;
}

export interface AtomsCanvasProps {
    atoms: AtomPosition[];
}

export const AtomsCanvas: React.FC<AtomsCanvasProps> = ({ atoms }) => {
    // 前回の座標を記憶
    const prevAtoms = useRef<AtomPosition[]>(atoms);
    useEffect(() => {
        prevAtoms.current = atoms;
    }, [atoms]);
    const [springs] = useSprings(
        atoms.length,
        (index) => ({
            from: {
                position:
                    prevAtoms.current[index] && atoms.length > 0
                        ? [
                              prevAtoms.current[index].x,
                              prevAtoms.current[index].y,
                              prevAtoms.current[index].z
                          ]
                        : [
                              atoms[index]?.x ?? 0,
                              atoms[index]?.y ?? 0,
                              atoms[index]?.z ?? 0
                          ]
            },
            to: {
                position: [atoms[index].x, atoms[index].y, atoms[index].z]
            },
            config: { mass: 1, tension: 120, friction: 14 }
        }),
        [atoms]
    );
    return (
        <Canvas
            style={{ width: 800, height: 400, background: '#fff' }}
            camera={{ position: [0, 0, 10], fov: 75 }}
        >
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 5, 5]} intensity={0.7} />
            {atoms.length > 0 &&
                springs.map((spring, i) => (
                    <Atom3D
                        key={`${atoms[i].symbol}-${atoms[i].x}-${atoms[i].y}-${atoms[i].z}`}
                        symbol={atoms[i].symbol}
                        color={atoms[i].color}
                        position={
                            spring.position as unknown as import(
                                '@react-spring/three'
                            ).SpringValue<[number, number, number]>
                        }
                    />
                ))}
            <OrbitControls enablePan={false} />
        </Canvas>
    );
};

export interface Atom3DProps {
    symbol: string;
    color: string;
    position: SpringValue<[number, number, number]> | [number, number, number];
}

export const Atom3D: React.FC<Atom3DProps> = ({ symbol, color, position }) => (
    <a.mesh position={position}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial color={color} />
        {/* ラベルを球の前面（カメラ側）に常に表示する */}
        <Text
            position={[0, 0, 1.1]} // 球の前面にラベルを配置
            fontSize={0.5}
            color="#222"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.03}
            outlineColor="#fff"
        >
            {symbol}
        </Text>
    </a.mesh>
);
