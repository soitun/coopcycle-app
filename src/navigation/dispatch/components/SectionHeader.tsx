import { useTranslation } from 'react-i18next';
import { Text } from '@/components/ui/text';
import { TouchableOpacity, View } from 'react-native';

import { useBackgroundHighlightColor } from '../../../styles/theme';
import { darkGreyColor, whiteColor } from '../../../styles/common';
import FAIcon from '@/src/components/Icon';

interface SectionHeaderProps {
  section: {
    id: string;
    title: string;
    backgroundColor: string;
    textColor: string;
    isUnassignedTaskList: boolean;
    ordersCount: number;
    tasksCount: number;
  };
  isExpanded: boolean;
  onToggle: () => void;
}

export function SectionHeader({ section, isExpanded, onToggle }: SectionHeaderProps) {
  const { t } = useTranslation();
  const bgHighlightColor = useBackgroundHighlightColor();

  return (
    <View style={{ backgroundColor: bgHighlightColor }}>
      <TouchableOpacity
        onPress={onToggle}
        activeOpacity={0.5}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 8,
          paddingVertical: 4,
          backgroundColor: whiteColor,
          margin: 4,
          borderRadius: 5,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              backgroundColor: section.backgroundColor,
              borderRadius: 4,
              marginEnd: 8,
              padding: 4,
            }}>
            <Text
              style={{
                color: section.textColor,
              }}>
              {section.title}
            </Text>
          </View>
          <Text style={{ color: darkGreyColor }}>
            {section.isUnassignedTaskList
              ? `${section.ordersCount}   (${section.tasksCount} ${t(
                  'TASKS',
                ).toLowerCase()})`
              : section.tasksCount}
          </Text>
        </View>
        {section.tasksCount === 0 ? null : (
          <FAIcon
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            testID={`${section.id}:toggler`}
            color={darkGreyColor}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}
