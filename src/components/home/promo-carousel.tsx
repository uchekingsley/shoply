import React, { useState, useRef, useEffect } from 'react';
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import {
  Palette,
  Typography,
  Spacing,
  BorderRadius,
} from '@/constants/theme';
import { MOCK_BANNERS } from '@/data/mock-data';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_WIDTH = SCREEN_WIDTH - Spacing.lg * 2;
const BANNER_HEIGHT = 160;

export interface PromoCarouselProps {
  onBannerPress?: (bannerId: string, categoryId?: string) => void;
}

export function PromoCarousel({ onBannerPress }: PromoCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // Auto-scroll effect
  useEffect(() => {
    if (MOCK_BANNERS.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % MOCK_BANNERS.length;
        flatListRef.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollOffset / (BANNER_WIDTH + Spacing.sm));
    if (index >= 0 && index < MOCK_BANNERS.length && index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={MOCK_BANNERS}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={BANNER_WIDTH + Spacing.sm}
        decelerationRate="fast"
        contentContainerStyle={styles.listContent}
        onMomentumScrollEnd={handleScroll}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => onBannerPress?.(item.id, item.targetCategory)}
            style={styles.bannerCard}
            accessibilityRole="button"
            accessibilityLabel={`${item.title}: ${item.subtitle}`}
          >
            <ExpoImage
              source={{ uri: item.imageUrl }}
              style={styles.bannerImage}
              contentFit="cover"
            />
            <View style={styles.gradientOverlay}>
              {item.tag && (
                <View style={styles.tagBadge}>
                  <Text style={styles.tagText}>{item.tag}</Text>
                </View>
              )}
              <Text style={styles.bannerTitle}>{item.title}</Text>
              <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
            </View>
          </Pressable>
        )}
      />

      {/* Pagination Dot Indicators */}
      <View style={styles.dotsContainer}>
        {MOCK_BANNERS.map((banner, index) => {
          const isActive = index === activeIndex;
          return (
            <View
              key={banner.id}
              style={[
                styles.dot,
                {
                  backgroundColor: isActive
                    ? Palette.actionOrange
                    : Palette.borderGreyLight,
                  width: isActive ? 18 : 6,
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.sm,
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  bannerCard: {
    width: BANNER_WIDTH,
    height: BANNER_HEIGHT,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(20, 43, 74, 0.45)', // Tinted brand navy overlay
    padding: Spacing.md + 2,
    justifyContent: 'flex-end',
  },
  tagBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Palette.actionOrange,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 6,
  },
  tagText: {
    color: Palette.white,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  bannerTitle: {
    ...Typography.sectionHeading,
    color: Palette.white,
    fontSize: 20,
    fontWeight: '700',
  },
  bannerSubtitle: {
    ...Typography.bodySmall,
    color: '#E5E8ED',
    marginTop: 2,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.sm,
    gap: 6,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
});
