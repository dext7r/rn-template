import { createNativeStackNavigator } from '@react-navigation/native-stack';

import useUpdateService from '@/hooks/useUpdateService';
import { ConfigPass } from '@/modules/auth/screens/configPass';
import { ForgetPass } from '@/modules/auth/screens/forgetPass';
import { Register } from '@/modules/auth/screens/register';
import { SignIn } from '@/modules/auth/screens/signIn';
import { LineChartDemo } from '@/modules/charts/screens/line';
import { EchartsRoot } from '@/modules/charts/screens/main';
import { MapChartDemo } from '@/modules/charts/screens/map';
import { ContactsDemo } from '@/modules/homepage/screens/contacts';
import { FlashListDemo } from '@/modules/homepage/screens/flashlist';
import { FlashListDemo1 } from '@/modules/homepage/screens/flashlist/demo1';
import { FlashListDemo2 } from '@/modules/homepage/screens/flashlist/demo2';
import { RefreshFlatListDemo } from '@/modules/homepage/screens/flashlist/demo3';
import { LocalModelDemo } from '@/modules/homepage/screens/localmodel';
import { LongForm } from '@/modules/homepage/screens/longform';
import { NavigationModal } from '@/modules/homepage/screens/modal';
import { LocalImageDemo } from '@/modules/homepage/screens/pictures/demo1';
import { OnlineImageDemo } from '@/modules/homepage/screens/pictures/demo2';
import { WaterfallListDemo } from '@/modules/homepage/screens/waterfall';
import { ImageCrop } from '@/modules/others/screens/imageCrop';
import { Agreement } from '@/modules/policy/screens/agreement';
import { Privacy } from '@/modules/policy/screens/privacy';
import { PrivacyConfirm } from '@/modules/policy/screens/privacyConfirm';
import { ModifyPassword } from '@/modules/user/screens/modifyPass';
import { Settings } from '@/modules/user/screens/settings';
import { storageService } from '@/services/StorageService';
import { TabStack } from '@/stacks/tabStack';

const AUTH_SCREENS = [
  {
    name: 'SignIn',
    component: SignIn,
  },
  {
    name: 'ConfigPass',
    component: ConfigPass,
  },
  {
    name: 'ForgetPass',
    component: ForgetPass,
  },
  {
    name: 'Register',
    component: Register,
  },
];

const MAIN_SCREENS = [
  {
    name: 'Tab',
    component: TabStack,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'EchartsDemo',
    component: EchartsRoot,
    options: {
      title: '图表展示',
    },
  },
  {
    name: 'LineChartDemo',
    component: LineChartDemo,
    options: {
      title: '折线图',
    },
  },
  {
    name: 'MapChartDemo',
    component: MapChartDemo,
    options: {
      title: '山东地图',
    },
  },
  {
    name: 'LocalModelDemo',
    component: LocalModelDemo,
    options: {
      title: '局部共享数据示例',
    },
  },
  {
    name: 'LongFormDemo',
    component: LongForm,
    options: {
      title: '长表单示例',
    },
  },
  {
    name: 'FlashListDemo',
    component: FlashListDemo,
    options: {
      title: 'FlashListDemo示例',
    },
  },
  {
    name: 'FlashListDemo1',
    component: FlashListDemo1,
    options: {
      title: 'FlashListDemo1示例',
      headerShown: false,
    },
  },
  {
    name: 'FlashListDemo2',
    component: FlashListDemo2,
    options: {
      title: 'FlashListDemo2示例',
    },
  },
  {
    name: 'RefreshFlatListDemo',
    component: RefreshFlatListDemo,
    options: {
      title: 'RefreshFlatListDemo示例',
    },
  },
  {
    name: 'WaterfallListDemo',
    component: WaterfallListDemo,
    options: {
      title: 'WaterfallListDemo示例',
    },
  },
  {
    name: 'ContactsDemo',
    component: ContactsDemo,
    options: {
      title: 'ContactsDemo示例',
    },
  },
  {
    name: 'LocalImageDemo',
    component: LocalImageDemo,
    options: {
      title: '本地图片示例',
    },
  },
  {
    name: 'OnlineImageDemo',
    component: OnlineImageDemo,
    options: {
      title: '网络图片示例',
    },
  },
  {
    name: 'Settings',
    component: Settings,
    options: {
      title: '系统设置',
    },
  },
  {
    name: 'ModifyPassword',
    component: ModifyPassword,
    options: {
      title: '修改密码',
    },
  },
  {
    name: 'ImageCrop',
    component: ImageCrop,
    options: {
      title: '图片裁切',
    },
  },
];

const MODAL_SCREENS = [
  {
    name: 'Agreement',
    component: Agreement,
    options: {
      title: '用户协议',
    },
  },
  {
    name: 'Privacy',
    component: Privacy,
    options: {
      title: '隐私政策',
    },
  },
  {
    name: 'NavigationModal',
    component: NavigationModal,
    options: {
      headerShown: false,
    },
  },
];

const Stack = createNativeStackNavigator();

export default () => {
  useUpdateService.useModel();

  const { confirmed, signedIn } = storageService;

  return (
    <Stack.Navigator
      initialRouteName={confirmed ? (signedIn ? 'Tab' : 'SignIn') : 'PrivacyConfirm'}
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        headerTitleAlign: 'center',
        animation: 'slide_from_right',
        animationDuration: 200,
      }}
    >
      {!confirmed && <Stack.Screen name="PrivacyConfirm" component={PrivacyConfirm} options={{ headerShown: false }} />}
      {signedIn ? (
        <Stack.Group
          screenOptions={{
            presentation: 'card',
          }}
        >
          {MAIN_SCREENS.map(screen => (
            <Stack.Screen key={screen.name} {...screen} />
          ))}
        </Stack.Group>
      ) : (
        <Stack.Group screenOptions={{ headerShown: false, presentation: 'card' }}>
          {AUTH_SCREENS.map(screen => (
            <Stack.Screen key={screen.name} {...screen} />
          ))}
        </Stack.Group>
      )}
      <Stack.Group
        screenOptions={{
          presentation: 'transparentModal',
          animation: 'slide_from_bottom',
          animationDuration: 200,
          animationTypeForReplace: 'pop',
        }}
      >
        {MODAL_SCREENS.map(screen => (
          <Stack.Screen key={screen.name} {...screen} />
        ))}
      </Stack.Group>
    </Stack.Navigator>
  );
};
