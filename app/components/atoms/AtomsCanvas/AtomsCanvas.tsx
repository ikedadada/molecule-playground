import { useSprings } from '@react-spring/three';
import { a } from '@react-spring/three';
import type { SpringValue } from '@react-spring/three';
import { OrbitControls, Text } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import type React from 'react';
import { useEffect, useRef } from 'react';
import type { Mesh } from 'three';

export interface AtomPosition {
    symbol: string;
    color: string;
    x: number;
    y: number;
    z: number;
}

export interface AtomsCanvasProps {
    atoms: AtomPosition[];
    isFloating?: boolean; // 分子化していない場合はふわふわアニメーション
}

export const AtomsCanvas: React.FC<AtomsCanvasProps> = ({
    atoms,
    isFloating
}) => {
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
        <Canvas className="bg-black" camera={{ position: [0, 0, 10], fov: 70 }}>
            <ambientLight intensity={0.7} />
            <directionalLight position={[5, 5, 5]} intensity={0.7} />
            {atoms.length > 0 &&
                springs.map((spring, i) => {
                    let position:
                        | [number, number, number]
                        | SpringValue<[number, number, number]>;
                    let isFloat = false;
                    if (isFloating) {
                        position = [atoms[i].x, 0, 0];
                        isFloat = true;
                    } else {
                        position = spring.position as unknown as import(
                            '@react-spring/three'
                        ).SpringValue<[number, number, number]>;
                    }
                    return (
                        <Atom3D
                            key={`${atoms[i].symbol}-${atoms[i].x}-${atoms[i].y}-${atoms[i].z}`}
                            symbol={atoms[i].symbol}
                            color={atoms[i].color}
                            position={position}
                            isFloating={isFloat}
                        />
                    );
                })}
            <OrbitControls enablePan={false} />
        </Canvas>
    );
};

export interface Atom3DProps {
    symbol: string;
    color: string;
    position: SpringValue<[number, number, number]> | [number, number, number];
    isFloating?: boolean;
}

export const Atom3D: React.FC<Atom3DProps> = ({
    symbol,
    color,
    position,
    isFloating
}) => {
    const ref = useRef<Mesh>(null);
    useFrame(() => {
        if (isFloating && ref.current && Array.isArray(position)) {
            const now = performance.now() / 1000;
            const [baseX] = position;
            ref.current.position.x = baseX + Math.sin(now + baseX) * 0.3;
            ref.current.position.y = Math.sin(now * 1.2 + baseX) * 0.7;
            ref.current.position.z = Math.cos(now + baseX) * 0.3;
        }
    });
    return (
        <a.mesh position={position} ref={ref}>
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
};
