import { FC, ReactNode } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { NavigationProp } from '@react-navigation/native';
import { helpers, SvgIcon, useTheme } from '@td-design/react-native';

import { EnhancedTouchableOpacity } from '@/components/EnhancedTouchable';
import { AppTheme } from '@/theme';

const { px } = helpers;
export const CustomHeader: FC<{
  title?: ReactNode;
  transparent?: boolean;
  headerLeft?: ReactNode;
  headerRight?: ReactNode;
  navigation?: NavigationProp<AuthStackParamList>;
}> = ({ transparent = true, title, headerLeft, headerRight, navigation }) => {
  const theme = useTheme<AppTheme>();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: transparent ? theme.colors.transparent : theme.colors.background,
      minHeight: px(60),
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: theme.spacing.x2,
      marginTop: Platform.OS === 'android' ? theme.spacing.x6 : 0,
    },
    left: { flex: 1 },
    title: { flex: 2 },
    right: { flex: 1 },
  });

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {headerLeft ?? (
          <EnhancedTouchableOpacity activeOpacity={0.7} onPress={() => navigation?.canGoBack && navigation.goBack()}>
            <SvgIcon name="left" color={theme.colors.white} size={px(24)} />
          </EnhancedTouchableOpacity>
        )}
      </View>
      <View style={styles.title}>{title}</View>
      <View style={styles.right}>{headerRight}</View>
    </View>
  );
};
