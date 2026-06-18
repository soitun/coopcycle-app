import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { VStack } from '@/components/ui/vstack';
import { SafeAreaView, ScrollView } from 'react-native';
import KeyboardAdjustView from '../../components/KeyboardAdjustView';

export default function ModalFormWrapper({
  children,
  handleSubmit,
  t,
  isSubmit = false,
  disabled = false,
  disabledMessage,
}) {
  const buttonLabel = disabled
    ? disabledMessage
    : isSubmit
      ? t('SUBMIT')
      : t('NEXT');

  return (
    <SafeAreaView
      className="bg-background-50"
      style={{ flex: 1 }}>
      <VStack
        flex={1}
        className="justify-between bg-background-50">
        <KeyboardAdjustView style={{ flex: 1 }}>
          <ScrollView
            keyboardShouldPersistTaps="handled" // tap is handled by the children in the forms
          >
            <Box className="p-5 gap-3">
              {children}
            </Box>
          </ScrollView>
          <Box className="p-5">
            <Button
              onPress={handleSubmit}
              disabled={disabled}
              style={disabled ? { opacity: 0.5 } : {}}
              testID="delivery__next_button">
              <ButtonText>{buttonLabel}</ButtonText>
            </Button>
          </Box>
        </KeyboardAdjustView>
      </VStack>
    </SafeAreaView>
  );
}
