import React, { useEffect, useRef, useState } from 'react';
import { Animated, View } from 'react-native';

export default function FadeInView({ duration = 500, style, children,isVisible=true }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
    const fadeIn = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    });

    fadeIn.start();
}

    if (!isVisible) {
      const fadeOut = Animated.timing(fadeAnim, {
        toValue: 0,
        duration: duration-200,
        useNativeDriver: true,
      });

      fadeOut.start();
    }

  }, [fadeAnim, duration,isVisible]);



  return (
    <Animated.View style={{ ...style, opacity: fadeAnim }}>
      {children}
    </Animated.View>
  );
}

