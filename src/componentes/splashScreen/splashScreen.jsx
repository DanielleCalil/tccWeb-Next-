"use client"
import { useState, useEffect } from 'react';
import Image from "next/image";
import anime from 'animejs';

const SplashScreen = ({ finishLoading }) => {
    // Função de animação
    const animate = () => {
        anime.timeline({
            complete: () => finishLoading(),
        })
        .add({
            targets: "#logo",
            delay: 0,
            scale: 1,
            duration: 500,
            easing: "easeInOutExpo",
        })
            .add({
                targets: "#logo",
                delay: 0,
                scale: 1.25,
                duration: 500,
                easing: "easeInOutExpo",
            })
            .add({
                targets: "#logo",
                delay: 0,
                scale: 1,
                duration: 500,
                easing: "easeInOutExpo",
            })
            .add({
                targets: "#logo",
                delay: 0,
                scale: 1.25,
                duration: 500,
                easing: "easeInOutExpo",
            });
    }

    // Garante que a animação será chamada após a montagem do componente
    useEffect(() => {
        const timeout = setTimeout(() => {
            animate();
        }, 500); // Pequeno atraso para garantir que a imagem seja carregada
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="flex h-screen w-full items-center justify-center" style={{ height: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image id="logo" src="/imgs/Escrita.png" alt="Logo" width={200} height={220} />
        </div>
    );
};

export default SplashScreen;
