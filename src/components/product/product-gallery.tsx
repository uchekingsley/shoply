import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { Palette, Spacing } from '@/constants/theme';
import { StatusBadge } from '@/components/ui';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface ProductGalleryProps {
  images: string[];
  discountPercent?: number;
}

export function ProductGallery({ images, discountPercent = 0 }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(_, index) => `gallery-img-${index}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const idx = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
          setActiveIndex(idx);
        }}
        renderItem={({ item }) => (
          <View style={styles.imageSlide}>
            <ExpoImage
              source={{ uri: item }}
              style={styles.image}
              contentFit="cover"
              transition={200}
            />
          </View>
        )}
      />

      {/* Position Indicators */}
      {images.length > 1 && (
        <View style={styles.indicatorContainer}>
          {images.map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    idx === activeIndex
                      ? Palette.actionOrange
                      : Palette.borderGreyLight,
                  width: idx === activeIndex ? 16 : 6,
                },
              ]}
            />
          ))}
        </View>
      )}

      {/* Discount Floating Badge */}
      {discountPercent > 0 && (
        <View style={styles.discountTag}>
          <StatusBadge label={`SAVE ${discountPercent}%`} variant="warning" size="md" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: 340,
    position: 'relative',
    backgroundColor: Palette.lightGrey,
  },
  imageSlide: {
    width: SCREEN_WIDTH,
    height: 340,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: Spacing.md,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  discountTag: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.lg,
  },
});
